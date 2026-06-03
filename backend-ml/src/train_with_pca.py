"""Entrainement et comparaison des modeles avec PCA pour Stroke Prediction."""

import json
from pathlib import Path

import joblib
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
from sklearn.base import clone
from sklearn.decomposition import PCA
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


PCA_COMPONENTS = 11


def build_model_pipelines(preprocessor) -> dict[str, Pipeline]:
    """Construit les pipelines imblearn avec PCA pour chaque modele."""
    base_transformer = clone(preprocessor.named_steps["preprocessor"])

    return {
        "logistic_regression": Pipeline(
            steps=[
                ("preprocessor", clone(base_transformer)),
                ("pca", PCA(n_components=PCA_COMPONENTS, random_state=42)),
                ("smote", SMOTE(random_state=42)),
                ("model", LogisticRegression(max_iter=1000, random_state=42)),
            ]
        ),
        "random_forest": Pipeline(
            steps=[
                ("preprocessor", clone(base_transformer)),
                ("pca", PCA(n_components=PCA_COMPONENTS, random_state=42)),
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
                ("pca", PCA(n_components=PCA_COMPONENTS, random_state=42)),
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
    """Calcule les metriques demandees pour un modele."""
    y_pred = model_pipeline.predict(X_test)
    y_proba = model_pipeline.predict_proba(X_test)[:, 1]

    return {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred, zero_division=0),
        "recall": recall_score(y_test, y_pred, zero_division=0),
        "f1_score": f1_score(y_test, y_pred, zero_division=0),
        "roc_auc": roc_auc_score(y_test, y_proba),
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
    }


def save_model(model_pipeline: Pipeline, filename: str) -> Path:
    """Sauvegarde un modele entraine dans le dossier models."""
    project_root = Path(__file__).resolve().parent.parent
    model_path = project_root / "models" / filename
    joblib.dump(model_pipeline, model_path)
    return model_path


def save_metrics(metrics: dict) -> Path:
    """Sauvegarde les metriques PCA dans reports/metrics_pca.json."""
    project_root = Path(__file__).resolve().parent.parent
    metrics_path = project_root / "reports" / "metrics_pca.json"
    metrics_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return metrics_path


def load_baseline_metrics() -> dict:
    """Charge les metriques sans PCA pour construire la comparaison."""
    project_root = Path(__file__).resolve().parent.parent
    metrics_path = project_root / "reports" / "metrics.json"
    return json.loads(metrics_path.read_text(encoding="utf-8"))


def build_comparison_summary(baseline_metrics: dict, pca_metrics: dict) -> str:
    """Construit un resume Markdown comparant les resultats sans et avec PCA."""
    lines = [
        "# Model Comparison Summary",
        "",
        f"- PCA appliquee avec **{PCA_COMPONENTS} composantes**.",
        "- Comparaison realisee entre les modeles entraines sans PCA et avec PCA.",
        "",
        "## Synthese par modele",
    ]

    for model_name in ["logistic_regression", "random_forest", "xgboost"]:
        baseline = baseline_metrics[model_name]
        with_pca = pca_metrics[model_name]
        lines.extend(
            [
                f"### {model_name}",
                f"- Accuracy : sans PCA = **{baseline['accuracy']:.4f}**, avec PCA = **{with_pca['accuracy']:.4f}**, delta = **{with_pca['accuracy'] - baseline['accuracy']:+.4f}**",
                f"- Precision : sans PCA = **{baseline['precision']:.4f}**, avec PCA = **{with_pca['precision']:.4f}**, delta = **{with_pca['precision'] - baseline['precision']:+.4f}**",
                f"- Recall : sans PCA = **{baseline['recall']:.4f}**, avec PCA = **{with_pca['recall']:.4f}**, delta = **{with_pca['recall'] - baseline['recall']:+.4f}**",
                f"- F1-score : sans PCA = **{baseline['f1_score']:.4f}**, avec PCA = **{with_pca['f1_score']:.4f}**, delta = **{with_pca['f1_score'] - baseline['f1_score']:+.4f}**",
                f"- ROC-AUC : sans PCA = **{baseline['roc_auc']:.4f}**, avec PCA = **{with_pca['roc_auc']:.4f}**, delta = **{with_pca['roc_auc'] - baseline['roc_auc']:+.4f}**",
                "",
            ]
        )

    best_baseline = max(baseline_metrics.items(), key=lambda item: item[1]["f1_score"])
    best_pca = max(pca_metrics.items(), key=lambda item: item[1]["f1_score"])

    lines.extend(
        [
            "## Conclusion",
            f"- Meilleur F1-score sans PCA : **{best_baseline[0]}** avec **{best_baseline[1]['f1_score']:.4f}**.",
            f"- Meilleur F1-score avec PCA : **{best_pca[0]}** avec **{best_pca[1]['f1_score']:.4f}**.",
            "- La decision finale peut privilegier soit la performance predictive, soit la reduction de dimension et la simplicite du modele.",
        ]
    )

    return "\n".join(lines) + "\n"


def save_comparison_summary(summary_content: str) -> Path:
    """Sauvegarde le resume comparatif Markdown."""
    project_root = Path(__file__).resolve().parent.parent
    summary_path = project_root / "reports" / "model_comparison_summary.md"
    summary_path.write_text(summary_content, encoding="utf-8")
    return summary_path


def print_metrics_table(metrics_by_model: dict[str, dict]) -> None:
    """Affiche un tableau lisible des metriques avec PCA."""
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

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model_pipelines = build_model_pipelines(preprocessor)
    metrics_by_model = {}
    model_filenames = {
        "logistic_regression": "logistic_regression_pca.joblib",
        "random_forest": "random_forest_pca.joblib",
        "xgboost": "xgboost_pca.joblib",
    }

    for model_name, model_pipeline in model_pipelines.items():
        model_pipeline.fit(X_train, y_train)
        metrics_by_model[model_name] = evaluate_model(model_pipeline, X_test, y_test)
        save_model(model_pipeline, model_filenames[model_name])

    metrics_path = save_metrics(metrics_by_model)
    baseline_metrics = load_baseline_metrics()
    comparison_summary = build_comparison_summary(baseline_metrics, metrics_by_model)
    comparison_summary_path = save_comparison_summary(comparison_summary)

    print_metrics_table(metrics_by_model)
    print(f"\nMetrics PCA saved to: {metrics_path}")
    print(f"Comparison summary saved to: {comparison_summary_path}")
