"""API FastAPI pour la prediction du risque d'AVC."""

import json
from contextlib import asynccontextmanager
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


PROJECT_ROOT = Path(__file__).resolve().parent
MODEL_PATH = PROJECT_ROOT / "models" / "final_model.joblib"
METRICS_PATH = PROJECT_ROOT / "reports" / "metrics_pca.json"
MODEL_NAME = "logistic_regression_pca"
AVAILABLE_MODELS = {
    "logistic_regression_pca": PROJECT_ROOT / "models" / "logistic_regression_pca.joblib",
    "random_forest_pca": PROJECT_ROOT / "models" / "random_forest_pca.joblib",
    "xgboost_pca": PROJECT_ROOT / "models" / "xgboost_pca.joblib",
}
EXPECTED_FEATURES = [
    "gender",
    "age",
    "hypertension",
    "heart_disease",
    "ever_married",
    "work_type",
    "Residence_type",
    "avg_glucose_level",
    "bmi",
    "smoking_status",
]
FORM_OPTIONS = {
    "gender": ["Female", "Male", "Other"],
    "hypertension": [0, 1],
    "heart_disease": [0, 1],
    "ever_married": ["No", "Yes"],
    "work_type": ["Govt_job", "Never_worked", "Private", "Self-employed", "children"],
    "Residence_type": ["Rural", "Urban"],
    "smoking_status": ["Unknown", "formerly smoked", "never smoked", "smokes"],
}
SAMPLE_PATIENT = {
    "gender": "Male",
    "age": 67.0,
    "hypertension": 1,
    "heart_disease": 1,
    "ever_married": "Yes",
    "work_type": "Private",
    "Residence_type": "Urban",
    "avg_glucose_level": 228.69,
    "bmi": 36.6,
    "smoking_status": "formerly smoked",
}


class PatientInput(BaseModel):
    """Structure de donnees attendue pour une prediction patient."""

    gender: str
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Charge le modele au demarrage de l'application."""
    if not MODEL_PATH.exists():
        raise RuntimeError(f"Modele final introuvable: {MODEL_PATH}")

    missing_models = [name for name, path in AVAILABLE_MODELS.items() if not path.exists()]
    if missing_models:
        raise RuntimeError(f"Modeles PCA introuvables: {', '.join(missing_models)}")

    app.state.model = joblib.load(MODEL_PATH)
    app.state.models = {
        model_name: joblib.load(model_path)
        for model_name, model_path in AVAILABLE_MODELS.items()
    }
    yield


app = FastAPI(
    title="Stroke Prediction API",
    description="API FastAPI pour predire le risque d'AVC a partir des donnees patient.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict:
    """Retourne un message d'accueil simple."""
    return {
        "message": "Stroke Prediction API is running.",
        "docs_url": "/docs",
        "model": MODEL_NAME,
    }


@app.get("/health")
def health_check() -> dict:
    """Retourne l'etat de sante de l'API et du modele."""
    model_loaded = hasattr(app.state, "model")
    return {
        "status": "ok" if model_loaded else "error",
        "model_loaded": model_loaded,
        "model_path": str(MODEL_PATH),
    }


@app.get("/model-info")
def model_info() -> dict:
    """Retourne des informations utiles sur le modele en production."""
    return {
        "model_name": MODEL_NAME,
        "model_path": str(MODEL_PATH),
        "available_models": list(AVAILABLE_MODELS.keys()),
        "expected_features": EXPECTED_FEATURES,
        "pipeline_type": "preprocessing + PCA + SMOTE + logistic regression",
    }


@app.get("/metrics")
def get_metrics() -> dict:
    """Retourne les metriques du modele retenu depuis reports/metrics_pca.json."""
    if not METRICS_PATH.exists():
        raise HTTPException(status_code=404, detail="Fichier de metriques introuvable.")

    try:
        metrics = json.loads(METRICS_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Fichier de metriques invalide.") from exc

    if "logistic_regression" not in metrics:
        raise HTTPException(status_code=404, detail="Metriques du modele logistic_regression introuvables.")

    return {
        "model": MODEL_NAME,
        "metrics": metrics["logistic_regression"],
    }


@app.get("/form-options")
def get_form_options() -> dict:
    """Retourne les valeurs possibles pour les champs du formulaire frontend."""
    return FORM_OPTIONS


@app.get("/sample-patient")
def get_sample_patient() -> dict:
    """Retourne un exemple complet de patient valide."""
    return SAMPLE_PATIENT


def build_prediction_response(model, input_df: pd.DataFrame, model_name: str) -> dict:
    """Construit une reponse de prediction standardisee pour un modele."""
    prediction = int(model.predict(input_df)[0])
    probability = float(model.predict_proba(input_df)[0][1])

    if probability >= 0.7:
        interpretation = "Risque eleve"
    elif probability >= 0.4:
        interpretation = "Risque modere"
    else:
        interpretation = "Risque faible"

    return {
        "prediction": prediction,
        "label": "Risque eleve d'AVC" if prediction == 1 else "Risque faible d'AVC",
        "risk_probability": probability,
        "risk_percentage": round(probability * 100, 2),
        "interpretation": interpretation,
        "model_used": model_name,
    }


@app.post("/predict")
def predict(patient: PatientInput) -> dict:
    """Effectue une prediction de risque d'AVC pour un patient."""
    if not hasattr(app.state, "model"):
        raise HTTPException(status_code=503, detail="Le modele n'est pas charge.")

    try:
        input_df = pd.DataFrame([patient.model_dump()], columns=EXPECTED_FEATURES)
        return build_prediction_response(app.state.model, input_df, MODEL_NAME)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la prediction: {exc}") from exc


@app.post("/predict-all")
def predict_all(patient: PatientInput) -> dict:
    """Execute la prediction sur les trois modeles PCA disponibles."""
    if not hasattr(app.state, "models"):
        raise HTTPException(status_code=503, detail="Les modeles ne sont pas charges.")

    try:
        input_df = pd.DataFrame([patient.model_dump()], columns=EXPECTED_FEATURES)
        predictions = {
            model_name: build_prediction_response(model, input_df, model_name)
            for model_name, model in app.state.models.items()
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la prediction multi-modeles: {exc}") from exc

    return {"models": predictions}
