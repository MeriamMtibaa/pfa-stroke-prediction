"""Analyse PCA pour la reduction de dimension du projet Stroke Prediction."""

import os
from pathlib import Path

import joblib
import numpy as np
from scipy import sparse
from sklearn.decomposition import PCA

from preprocess import load_and_preprocess_data

# Utilise un dossier de configuration Matplotlib inscriptible.
PROJECT_ROOT = Path(__file__).resolve().parent.parent
MPL_CONFIG_DIR = PROJECT_ROOT / "reports" / ".matplotlib"
MPL_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
os.environ["MPLCONFIGDIR"] = str(MPL_CONFIG_DIR)

import matplotlib.pyplot as plt
import seaborn as sns


def save_plot(fig: plt.Figure, output_path: Path) -> None:
    """Sauvegarde une figure puis la ferme proprement."""
    fig.tight_layout()
    fig.savefig(output_path, dpi=300, bbox_inches="tight")
    plt.close(fig)


def ensure_dense(matrix) -> np.ndarray:
    """Convertit une matrice sparse en tableau dense si necessaire."""
    if sparse.issparse(matrix):
        return matrix.toarray()
    return np.asarray(matrix)


def main() -> None:
    """Execute l'analyse PCA complete et sauvegarde les artefacts."""
    sns.set_theme(style="whitegrid")

    reports_dir = PROJECT_ROOT / "reports"
    figures_dir = reports_dir / "figures"
    figures_dir.mkdir(parents=True, exist_ok=True)

    X, y, preprocessor = load_and_preprocess_data()

    # Applique le preprocessing complet avant la reduction de dimension.
    X_preprocessed = preprocessor.fit_transform(X, y)
    X_preprocessed_dense = ensure_dense(X_preprocessed)

    initial_feature_count = X_preprocessed_dense.shape[1]

    # Entraine une PCA complete pour mesurer la variance expliquee par composante.
    full_pca = PCA()
    full_pca.fit(X_preprocessed_dense)

    explained_variance_ratio = full_pca.explained_variance_ratio_
    cumulative_variance_ratio = np.cumsum(explained_variance_ratio)

    # Recherche le nombre minimal de composantes necessaire pour atteindre 95%.
    n_components_95 = int(np.searchsorted(cumulative_variance_ratio, 0.95) + 1)
    retained_variance = float(cumulative_variance_ratio[n_components_95 - 1] * 100)

    # Cree le modele PCA final reduit et le sauvegarde.
    retained_pca = PCA(n_components=n_components_95)
    retained_pca.fit(X_preprocessed_dense)

    pca_model_path = PROJECT_ROOT / "models" / "pca.joblib"
    joblib.dump(retained_pca, pca_model_path)

    # Figure 1 : variance expliquee par composante.
    fig, ax = plt.subplots(figsize=(10, 5))
    component_indices = np.arange(1, len(explained_variance_ratio) + 1)
    ax.bar(component_indices, explained_variance_ratio, color="#2a9d8f")
    ax.set_title("Variance expliquee par composante PCA")
    ax.set_xlabel("Composante principale")
    ax.set_ylabel("Proportion de variance expliquee")
    save_plot(fig, figures_dir / "pca_explained_variance.png")

    # Figure 2 : variance cumulee avec seuil de 95%.
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(component_indices, cumulative_variance_ratio, marker="o", color="#e76f51")
    ax.axhline(y=0.95, color="#264653", linestyle="--", label="Seuil 95%")
    ax.axvline(x=n_components_95, color="#1d3557", linestyle="--", label=f"{n_components_95} composantes")
    ax.set_title("Variance cumulee de la PCA")
    ax.set_xlabel("Nombre de composantes")
    ax.set_ylabel("Variance cumulee")
    ax.legend()
    save_plot(fig, figures_dir / "pca_cumulative_variance.png")

    summary_path = reports_dir / "pca_summary.md"
    summary_lines = [
        "# PCA Summary",
        "",
        f"- Nombre initial de features apres preprocessing : **{initial_feature_count}**",
        f"- Nombre de composantes retenues apres PCA : **{n_components_95}**",
        f"- Pourcentage de variance expliquee par les composantes retenues : **{retained_variance:.2f}%**",
    ]
    summary_path.write_text("\n".join(summary_lines) + "\n", encoding="utf-8")

    print(f"Nombre de features initial : {initial_feature_count}")
    print(f"Nombre de composantes PCA retenues : {n_components_95}")
    print(f"Variance expliquee : {retained_variance:.2f}%")


if __name__ == "__main__":
    main()
