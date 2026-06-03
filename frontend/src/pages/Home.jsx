import { useEffect, useState } from 'react'

import PatientForm from '../components/PatientForm'
import PredictionCard from '../components/PredictionCard'
import { getHealth, getMetrics, getModelInfo } from '../api/strokeApi'

function Home() {
  const [health, setHealth] = useState(null)
  const [modelInfo, setModelInfo] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [predictionResult, setPredictionResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true)
      setError('')

      try {
        const [healthResponse, modelInfoResponse, metricsResponse] = await Promise.all([
          getHealth(),
          getModelInfo(),
          getMetrics(),
        ])

        setHealth(healthResponse.data)
        setModelInfo(modelInfoResponse.data)
        setMetrics(metricsResponse.data)
      } catch (error) {
        setError(error.message || 'Erreur lors du chargement des donnees du backend.')
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Stroke Risk Screening</span>
          <h2>Evaluation rapide du risque d'AVC a partir du profil patient</h2>
          <p>
            Cette interface connecte React au backend FastAPI pour charger les informations du modele,
            visualiser ses performances et lancer une prediction clinique en quelques secondes.
          </p>
        </div>

        <div className="hero-stats">
          <article className="stat-card">
            <span className="stat-label">API Status</span>
            <strong className="stat-value">{loading ? '...' : health?.status || 'indisponible'}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">Model</span>
            <strong className="stat-value">{loading ? '...' : modelInfo?.model_name || 'non charge'}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">Recall</span>
            <strong className="stat-value">
              {loading ? '...' : metrics?.metrics?.recall?.toFixed(2) || 'n/a'}
            </strong>
          </article>
        </div>
      </section>

      <section className="section-header">
        <div>
          <span className="eyebrow">System Overview</span>
          <h2>Etat du service et performances du modele final</h2>
          <p>Les informations ci-dessous proviennent directement du backend FastAPI expose pour l'application.</p>
        </div>
      </section>

      <section className="page-grid">
        <section className="card">
          <h2>API Status</h2>
          {loading ? (
            <p>Chargement des informations backend...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <div className="info-stack">
              <p>
                <strong>Statut API :</strong> {health?.status}
              </p>
              <p>
                <strong>Modele charge :</strong> {health?.model_loaded ? 'Oui' : 'Non'}
              </p>
              <p>
                <strong>Nom du modele :</strong> {modelInfo?.model_name}
              </p>
              <p>
                <strong>Pipeline :</strong> {modelInfo?.pipeline_type}
              </p>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Model Metrics</h2>
          {loading ? (
            <p>Chargement des metriques...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            <div className="metrics-grid">
              <div className="metric-pill">
                <span>Accuracy</span>
                <strong>{metrics?.metrics?.accuracy?.toFixed(4)}</strong>
              </div>
              <div className="metric-pill">
                <span>Precision</span>
                <strong>{metrics?.metrics?.precision?.toFixed(4)}</strong>
              </div>
              <div className="metric-pill">
                <span>Recall</span>
                <strong>{metrics?.metrics?.recall?.toFixed(4)}</strong>
              </div>
              <div className="metric-pill">
                <span>F1-score</span>
                <strong>{metrics?.metrics?.f1_score?.toFixed(4)}</strong>
              </div>
              <div className="metric-pill">
                <span>ROC-AUC</span>
                <strong>{metrics?.metrics?.roc_auc?.toFixed(4)}</strong>
              </div>
            </div>
          )}
        </section>
      </section>

      <section className="section-header">
        <div>
          <span className="eyebrow">Prediction Workspace</span>
          <h2>Renseigner un patient puis obtenir une estimation du risque</h2>
          <p>Le formulaire ci-dessous interroge le pipeline final retenu pour l'API sans modifier la logique existante.</p>
        </div>
      </section>

      <section className="page-grid">
        <PatientForm onPrediction={setPredictionResult} />
        <PredictionCard predictionResult={predictionResult} />
      </section>
    </main>
  )
}

export default Home
