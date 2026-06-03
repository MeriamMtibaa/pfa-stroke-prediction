"""Exploration initiale du dataset stroke.

Ce script charge le dataset brut et affiche un résumé utile
avant toute étape de preprocessing ou d'entraînement.
"""

from pathlib import Path

import pandas as pd


def main() -> None:
    """Charge le dataset et affiche les informations d'exploration."""
    # Construit le chemin absolu vers le dataset à partir du dossier backend-ml.
    project_root = Path(__file__).resolve().parent.parent
    dataset_path = project_root / "data" / "healthcare-dataset-stroke-data.csv"

    # Charge le CSV. Les valeurs "N/A" sont interprétées comme manquantes par pandas.
    df = pd.read_csv(dataset_path)

    print("=== DATASET OVERVIEW ===")
    print(f"Chemin du fichier : {dataset_path}")
    print(f"Dimensions du dataset : {df.shape[0]} lignes x {df.shape[1]} colonnes")

    print("\n=== COLONNES ===")
    print(df.columns.tolist())

    print("\n=== TYPES DES COLONNES ===")
    print(df.dtypes)

    print("\n=== PREMIERES LIGNES ===")
    print(df.head())

    print("\n=== STATISTIQUES DESCRIPTIVES ===")
    print(df.describe(include="all"))

    print("\n=== VALEURS MANQUANTES PAR COLONNE ===")
    print(df.isna().sum())

    print("\n=== NOMBRE DE DOUBLONS ===")
    print(df.duplicated().sum())

    print("\n=== DISTRIBUTION DE LA VARIABLE CIBLE 'stroke' ===")
    stroke_distribution = df["stroke"].value_counts().sort_index()
    print(stroke_distribution)

    print("\n=== POURCENTAGE DE CHAQUE CLASSE DE 'stroke' ===")
    stroke_percentages = df["stroke"].value_counts(normalize=True).sort_index() * 100
    print(stroke_percentages.round(2))

    print("\n=== VALEURS UNIQUES DES COLONNES CATEGORIELLES ===")
    # Inclut explicitement les dtypes texte récents de pandas pour éviter les warnings.
    categorical_columns = df.select_dtypes(include=["object", "string", "category"]).columns
    for column in categorical_columns:
        unique_values = sorted(df[column].dropna().unique().tolist())
        print(f"{column} ({len(unique_values)} valeurs) : {unique_values}")


if __name__ == "__main__":
    main()
