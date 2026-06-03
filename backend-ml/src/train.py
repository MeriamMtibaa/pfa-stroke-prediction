"""Entraînement et évaluation des modèles du projet Stroke Prediction.

Ce script entraîne trois modèles sur des données déséquilibrées en
utilisant un pipeline imblearn combinant preprocessing, SMOTE et modèle.
"""

import json
from pathlib import Path

import joblib
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
from sklearn.base import clone
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

from preprocess import load_and_preprocess_data


def build_model_pipelines(preprocessor) -> dict[str, Pipeline]:
    """Construit les pipelines d'entraînement pour chaque modèle."""
    # imblearn n'accepte pas ici un Pipeline sklearn imbriqué comme étape intermédiaire.
    # On réutilise donc directement le ColumnTransformer contenu dans le pipeline de preprocessing.
    base_transformer = clone(preprocessor.named_steps["preprocessor"])

    return {
        "logistic_regression": Pipeline(
            steps=[
                ("preprocessor", clone(base_transformer)),
                ("smote", SMOTE(random_state=42)),
                # Logistic Regression sert de base simple et interpretable pour comparer les autres modeles.
                ("model", LogisticRegression(max_iter=1000, random_state=42)),
            ]
        ),
        "random_forest": Pipeline(
            steps=[
                ("preprocessor", clone(base_transformer)),
                ("smote", SMOTE(random_state=42)),
                (
                    "model",
                    RandomForestClassifier(
                        n_estimators=300,
                        random_state=42,
                        n_jobs=-1,
                    ),
                ),
            ]
        ),
        "xgboost": Pipeline(
            steps=[
                ("preprocessor", clone(base_transformer)),
                ("smote", SMOTE(random_state=42)),
                (
                    "model",
                    XGBClassifier(
                        n_estimators=300,
                        max_depth=5,
                        learning_rate=0.05,
                        subsample=0.9,
                        colsample_bytree=0.9,
                        random_state=42,
                        eval_metric="logloss",
                    ),
                ),
            ]
        ),
    }


def evaluate_model(model_pipeline: Pipeline, X_test, y_test) -> dict:
    """Calcule l'ensemble des métriques demandées pour un modèle."""
    y_pred = model_pipeline.predict(X_test)
    y_proba = model_pipeline.predict_proba(X_test)[:, 1]

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred, zero_division=0),
        "recall": recall_score(y_test, y_pred, zero_division=0),
        "f1_score": f1_score(y_test, y_pred, zero_division=0),
        "roc_auc": roc_auc_score(y_test, y_proba),
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
    }
    return metrics


def save_metrics(metrics: dict) -> Path:
    """Sauvegarde les métriques au format JSON dans le dossier reports."""
    project_root = Path(__file__).resolve().parent.parent
    reports_path = project_root / "reports" / "metrics.json"
    reports_path.parent.mkdir(parents=True, exist_ok=True)
    reports_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return reports_path


def save_model(model_pipeline: Pipeline, filename: str) -> Path:
    """Sauvegarde un modèle entraîné dans le dossier models."""
    project_root = Path(__file__).resolve().parent.parent
    model_path = project_root / "models" / filename
    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model_pipeline, model_path)
    return model_path


def print_metrics_table(metrics_by_model: dict[str, dict]) -> None:
    """Affiche un tableau lisible des métriques principales."""
    header = (
        f"{'Model':<22}"
        f"{'Accuracy':>10}"
        f"{'Precision':>12}"
        f"{'Recall':>10}"
        f"{'F1 Score':>10}"
        f"{'ROC AUC':>10}"
    )
    print(header)
    print("-" * len(header))

    for model_name, model_metrics in metrics_by_model.items():
        print(
            f"{model_name:<22}"
            f"{model_metrics['accuracy']:>10.4f}"
            f"{model_metrics['precision']:>12.4f}"
            f"{model_metrics['recall']:>10.4f}"
            f"{model_metrics['f1_score']:>10.4f}"
            f"{model_metrics['roc_auc']:>10.4f}"
        )

    print("\nConfusion matrices:")
    for model_name, model_metrics in metrics_by_model.items():
        print(f"- {model_name}: {model_metrics['confusion_matrix']}")


if __name__ == "__main__":
    X, y, preprocessor = load_and_preprocess_data()

    # Sépare les données en conservant la proportion de classes.
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model_pipelines = build_model_pipelines(preprocessor)

    # On garde la meme boucle pour tous les modeles afin de comparer dans des conditions identiques.
    metrics_by_model = {}
    model_filenames = {
        "logistic_regression": "logistic_regression.joblib",
        "random_forest": "random_forest.joblib",
        "xgboost": "xgboost.joblib",
    }

    for model_name, model_pipeline in model_pipelines.items():
        model_pipeline.fit(X_train, y_train)
        metrics_by_model[model_name] = evaluate_model(model_pipeline, X_test, y_test)
        save_model(model_pipeline, model_filenames[model_name])

    metrics_path = save_metrics(metrics_by_model)

    print_metrics_table(metrics_by_model)
    print(f"\nMetrics saved to: {metrics_path}")
