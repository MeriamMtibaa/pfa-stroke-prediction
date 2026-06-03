"""Analyse exploratoire graphique du dataset stroke.

Ce script génère des visualisations descriptives et un résumé Markdown
à partir du dataset brut, sans appliquer de preprocessing.
"""

import os
from pathlib import Path

# Définit un dossier de configuration Matplotlib inscriptible dans le projet.
MPL_CONFIG_DIR = Path(__file__).resolve().parent.parent / "reports" / ".matplotlib"
MPL_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
os.environ["MPLCONFIGDIR"] = str(MPL_CONFIG_DIR)

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


def save_plot(fig: plt.Figure, output_path: Path) -> None:
    """Sauvegarde une figure puis la ferme pour libérer la mémoire."""
    fig.tight_layout()
    fig.savefig(output_path, dpi=300, bbox_inches="tight")
    plt.close(fig)


def plot_target_distribution(df: pd.DataFrame, figures_dir: Path) -> None:
    """Trace la distribution de la variable cible stroke."""
    fig, ax = plt.subplots(figsize=(8, 5))
    sns.countplot(data=df, x="stroke", hue="stroke", palette="Set2", legend=False, ax=ax)
    ax.set_title("Distribution de la variable cible stroke")
    ax.set_xlabel("stroke")
    ax.set_ylabel("Nombre d'observations")
    save_plot(fig, figures_dir / "stroke_distribution.png")


def plot_histogram(df: pd.DataFrame, column: str, figures_dir: Path) -> None:
    """Trace un histogramme avec courbe de densité pour une variable numérique."""
    fig, ax = plt.subplots(figsize=(8, 5))
    sns.histplot(data=df, x=column, bins=30, kde=True, color="#2a9d8f", ax=ax)
    ax.set_title(f"Histogramme de {column}")
    ax.set_xlabel(column)
    ax.set_ylabel("Fréquence")
    save_plot(fig, figures_dir / f"{column}_histogram.png")


def plot_correlation_heatmap(df: pd.DataFrame, figures_dir: Path) -> None:
    """Trace la heatmap des corrélations entre variables numériques."""
    numeric_df = df.select_dtypes(include=["number"])
    correlation_matrix = numeric_df.corr(numeric_only=True)

    fig, ax = plt.subplots(figsize=(10, 7))
    sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f", ax=ax)
    ax.set_title("Heatmap de corrélation des variables numériques")
    save_plot(fig, figures_dir / "numeric_correlation_heatmap.png")


def plot_stroke_by_category(df: pd.DataFrame, column: str, figures_dir: Path) -> None:
    """Trace la distribution de stroke selon une variable catégorielle."""
    fig, ax = plt.subplots(figsize=(9, 5))
    sns.countplot(data=df, x=column, hue="stroke", palette="Set2", ax=ax)
    ax.set_title(f"Stroke selon {column}")
    ax.set_xlabel(column)
    ax.set_ylabel("Nombre d'observations")
    ax.tick_params(axis="x", rotation=20)
    save_plot(fig, figures_dir / f"stroke_by_{column}.png")


def build_summary(df: pd.DataFrame, summary_path: Path) -> None:
    """Construit un résumé Markdown des observations principales."""
    stroke_counts = df["stroke"].value_counts().sort_index()
    stroke_percentages = (df["stroke"].value_counts(normalize=True).sort_index() * 100).round(2)
    missing_bmi = int(df["bmi"].isna().sum())

    numeric_corr = df.select_dtypes(include=["number"]).corr(numeric_only=True)["stroke"].drop("stroke")
    top_corr = numeric_corr.abs().sort_values(ascending=False).head(3)

    gender_rates = (
        df.groupby("gender", dropna=False)["stroke"]
        .mean()
        .sort_values(ascending=False)
        .mul(100)
        .round(2)
    )
    hypertension_rates = (
        df.groupby("hypertension")["stroke"].mean().sort_index().mul(100).round(2)
    )
    heart_disease_rates = (
        df.groupby("heart_disease")["stroke"].mean().sort_index().mul(100).round(2)
    )
    smoking_rates = (
        df.groupby("smoking_status", dropna=False)["stroke"]
        .mean()
        .sort_values(ascending=False)
        .mul(100)
        .round(2)
    )

    summary_lines = [
        "# EDA Summary",
        "",
        "## Vue d'ensemble",
        f"- Le dataset contient **{df.shape[0]} lignes** et **{df.shape[1]} colonnes**.",
        f"- La variable `bmi` contient **{missing_bmi} valeurs manquantes**.",
        f"- Le dataset contient **{int(df.duplicated().sum())} doublon**.",
        "",
        "## Variable cible `stroke`",
        f"- Classe `0` : **{int(stroke_counts.get(0, 0))}** observations (**{stroke_percentages.get(0, 0.0):.2f}%**).",
        f"- Classe `1` : **{int(stroke_counts.get(1, 0))}** observations (**{stroke_percentages.get(1, 0.0):.2f}%**).",
        "- La cible est fortement déséquilibrée, ce qui devra être pris en compte pendant la modélisation.",
        "",
        "## Corrélations numériques avec `stroke`",
    ]

    for feature, value in top_corr.items():
        summary_lines.append(f"- `{feature}` : corrélation de **{value:.3f}** avec `stroke`.")

    summary_lines.extend(
        [
            "",
            "## Taux de stroke par groupe",
            "- `gender` : " + ", ".join(f"{idx} = {val:.2f}%" for idx, val in gender_rates.items()),
            "- `hypertension` : "
            + ", ".join(f"{idx} = {val:.2f}%" for idx, val in hypertension_rates.items()),
            "- `heart_disease` : "
            + ", ".join(f"{idx} = {val:.2f}%" for idx, val in heart_disease_rates.items()),
            "- `smoking_status` : "
            + ", ".join(f"{idx} = {val:.2f}%" for idx, val in smoking_rates.items()),
            "",
            "## Points d'attention",
            "- Les valeurs manquantes de `bmi` devront être imputées avant l'entraînement.",
            "- Le déséquilibre de classes suggère l'usage de métriques adaptées et possiblement d'une stratégie de rééquilibrage.",
            "- Les variables liées à l'âge, au glucose, à l'hypertension et aux maladies cardiaques sont à surveiller pendant le preprocessing et la modélisation.",
        ]
    )

    summary_path.write_text("\n".join(summary_lines) + "\n", encoding="utf-8")


def main() -> None:
    """Charge le dataset, génère les figures et le résumé EDA."""
    sns.set_theme(style="whitegrid")

    project_root = Path(__file__).resolve().parent.parent
    dataset_path = project_root / "data" / "healthcare-dataset-stroke-data.csv"
    reports_dir = project_root / "reports"
    figures_dir = reports_dir / "figures"
    summary_path = reports_dir / "eda_summary.md"

    figures_dir.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(dataset_path)

    plot_target_distribution(df, figures_dir)
    plot_histogram(df, "age", figures_dir)
    plot_histogram(df, "bmi", figures_dir)
    plot_histogram(df, "avg_glucose_level", figures_dir)
    plot_correlation_heatmap(df, figures_dir)
    plot_stroke_by_category(df, "gender", figures_dir)
    plot_stroke_by_category(df, "hypertension", figures_dir)
    plot_stroke_by_category(df, "heart_disease", figures_dir)
    plot_stroke_by_category(df, "smoking_status", figures_dir)
    build_summary(df, summary_path)

    generated_files = sorted(path.name for path in figures_dir.glob("*.png"))

    print("EDA terminee.")
    print(f"Dossier des figures : {figures_dir}")
    print("Figures generees :")
    for filename in generated_files:
        print(f"- {filename}")
    print(f"Resume genere : {summary_path}")


if __name__ == "__main__":
    main()
