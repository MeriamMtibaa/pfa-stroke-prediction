function PredictionCard({ predictionResult }) {
  return (
    <section className="card">
      <h2>Prediction Result</h2>
      {!predictionResult ? (
        <p>Aucune prediction pour le moment.</p>
      ) : predictionResult.error ? (
        <p className="error-text">{predictionResult.error}</p>
      ) : (
        <>
          {/* On garde un resume lisible avant le JSON complet pour le rapport et la demo. */}
          <p>
            <strong>Prediction :</strong> {predictionResult.response?.prediction}
          </p>
          <p>
            <strong>Label :</strong> {predictionResult.response?.label}
          </p>
          <p>
            <strong>Probabilite :</strong> {predictionResult.response?.risk_probability}
          </p>
          <p>
            <strong>Pourcentage :</strong> {predictionResult.response?.risk_percentage}%
          </p>
          <p>
            <strong>Interpretation :</strong> {predictionResult.response?.interpretation}
          </p>
          <p>
            <strong>Modele :</strong> {predictionResult.response?.model_used}
          </p>
          <pre>{JSON.stringify(predictionResult.response, null, 2)}</pre>
        </>
      )}
    </section>
  )
}

export default PredictionCard
