"""Preprocessing réutilisable pour le projet Stroke Prediction.

Ce module charge le dataset brut, prépare les variables explicatives et
construit un pipeline sklearn complet pour l'imputation, l'encodage et
la standardisation.
"""

from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


def load_and_preprocess_data() -> tuple[pd.DataFrame, pd.Series, Pipeline]:
    """Charge le dataset et construit le pipeline de preprocessing.

    Returns:
        X: Variables explicatives sans la cible ni la colonne `id`.
        y: Variable cible `stroke`.
        preprocessor: Pipeline sklearn complet prêt à être entraîné.
    """
    project_root = Path(__file__).resolve().parent.parent
    dataset_path = project_root / "data" / "healthcare-dataset-stroke-data.csv"

    # Charge le dataset source utilisé dans tout le projet.
    df = pd.read_csv(dataset_path)

    # Retire l'identifiant, inutile pour la modélisation.
    df = df.drop(columns=["id"])

    # Sépare les features de la cible.
    X = df.drop(columns=["stroke"])
    y = df["stroke"]

    # Détecte automatiquement les colonnes par type pour garder le code réutilisable.
    numeric_features = X.select_dtypes(include=["number"]).columns.tolist()
    categorical_features = X.select_dtypes(include=["object", "string", "category"]).columns.tolist()

    # Pipeline numérique : imputation par médiane puis standardisation.
    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    # Pipeline catégoriel : imputation par valeur la plus fréquente puis one-hot encoding.
    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    # Combine les transformations numériques et catégorielles.
    column_transformer = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, numeric_features),
            ("cat", categorical_pipeline, categorical_features),
        ]
    )

    # Encapsule le ColumnTransformer dans un pipeline sklearn complet.
    preprocessor = Pipeline(
        steps=[
            ("preprocessor", column_transformer),
        ]
    )

    return X, y, preprocessor


def save_preprocessor(preprocessor: Pipeline) -> Path:
    """Sauvegarde le préprocesseur sklearn dans le dossier models.

    Args:
        preprocessor: Pipeline de preprocessing à sérialiser.

    Returns:
        Le chemin du fichier sauvegardé.
    """
    project_root = Path(__file__).resolve().parent.parent
    model_path = project_root / "models" / "preprocessor.joblib"
    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(preprocessor, model_path)
    return model_path


if __name__ == "__main__":
    X, y, preprocessor = load_and_preprocess_data()
    X_transformed = preprocessor.fit_transform(X, y)

    feature_names = preprocessor.named_steps["preprocessor"].get_feature_names_out()
    saved_path = save_preprocessor(preprocessor)

    print(f"Shape initiale : {X.shape}")
    print(f"Shape apres transformation : {X_transformed.shape}")
    print(f"Nombre de features finales apres encodage : {len(feature_names)}")
    print(f"Preprocessor sauvegarde : {saved_path}")
