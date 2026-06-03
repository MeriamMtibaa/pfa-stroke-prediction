const MODEL_ORDER = [
  'logistic_regression_pca',
  'random_forest_pca',
  'xgboost_pca',
]

function MultiModelResults({ allPredictions }) {
  const modelResults = allPredictions?.response?.models

  return (
    <section className="card multi-model-card">
      <h2>Comparaison des 3 modeles</h2>

      {!allPredictions ? (
        <p>Aucune comparaison disponible pour le moment.</p>
      ) : allPredictions.error ? (
        <p className="error-text">{allPredictions.error}</p>
      ) : (
        <div className="multi-model-grid">
          {MODEL_ORDER.map((modelName) => {
            const modelResult = modelResults?.[modelName]

            return (
              <article key={modelName} className="model-result-card">
                <h3>{modelName}</h3>
                <p>
                  <strong>Prediction :</strong> {modelResult?.prediction}
                </p>
                <p>
                  <strong>Label :</strong> {modelResult?.label}
                </p>
                <p>
                  <strong>Pourcentage :</strong> {modelResult?.risk_percentage}%
                </p>
                <p>
                  <strong>Interpretation :</strong> {modelResult?.interpretation}
                </p>
                <p>
                  <strong>Modele :</strong> {modelResult?.model_used}
                </p>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default MultiModelResults
