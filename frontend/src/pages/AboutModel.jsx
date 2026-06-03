import { useEffect, useState } from 'react'

import { getMetrics, getModelInfo } from '../api/strokeApi'

function AboutModel() {
  const [modelInfo, setModelInfo] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadModelData() {
      setLoading(true)
      setError('')

      try {
        const [infoResponse, metricsResponse] = await Promise.all([
          getModelInfo(),
          getMetrics(),
        ])

        setModelInfo(infoResponse.data)
        setMetrics(metricsResponse.data)
      } catch (error) {
        setError(error.message || 'Erreur lors du chargement des informations du modele.')
      } finally {
        setLoading(false)
      }
    }

    loadModelData()
  }, [])

  const modelMetrics = metrics?.metrics

  return (
    <main className="page-grid">
      <section className="card">
        <h2>Dataset</h2>
        {loading ? (
          <p>Chargement des informations du modele...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p>Le projet utilise le dataset Stroke Prediction avec 5110 lignes et 12 colonnes.</p>
            <p>La cible `stroke` est fortement desequilibree, ce qui rend la detection des cas positifs plus delicate.</p>
            <p>Le contexte medical impose donc de privilegier les metriques qui limitent les faux negatifs.</p>
          </>
        )}
      </section>

      <section className="card">
        <h2>Preprocessing</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p>
              Le pipeline applique un <strong>preprocessing complet</strong> avant l'inference :
            </p>
            <p>imputation des valeurs manquantes, encodage des variables categorielles et standardisation des variables numeriques.</p>
            <p>
              Pipeline backend declare : <strong>{modelInfo?.pipeline_type}</strong>
            </p>
          </>
        )}
      </section>

      <section className="card">
        <h2>PCA</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p>
              La reduction de dimension par PCA fait passer les donnees de <strong>21 features</strong> a <strong>11 composantes</strong>.
            </p>
            <p>
              Cette reduction conserve <strong>95.45%</strong> de la variance totale.
            </p>
            <p>Elle simplifie le probleme tout en gardant l'essentiel de l'information utile pour la prediction.</p>
          </>
        )}
      </section>

      <section className="card">
        <h2>Models Comparison</h2>
        {loading ? (
          <p>Chargement des metriques...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p>Trois familles de modeles ont ete comparees : Logistic Regression, Random Forest et XGBoost.</p>
            <p>La version finale retenue utilise Logistic Regression avec PCA car elle conserve un recall eleve avec un bon compromis global.</p>
            <p>
              Metriques principales :
            </p>
            <p>
              <strong>Accuracy :</strong> {modelMetrics?.accuracy?.toFixed(4)}
            </p>
            <p>
              <strong>Precision :</strong> {modelMetrics?.precision?.toFixed(4)}
            </p>
            <p>
              <strong>Recall :</strong> {modelMetrics?.recall?.toFixed(4)}
            </p>
            <p>
              <strong>F1-score :</strong> {modelMetrics?.f1_score?.toFixed(4)}
            </p>
            <p>
              <strong>ROC-AUC :</strong> {modelMetrics?.roc_auc?.toFixed(4)}
            </p>
          </>
        )}
      </section>

      <section className="card">
        <h2>Final Choice</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <p>
              <strong>Modele final :</strong> {modelInfo?.model_name}
            </p>
            <p>
              <strong>Pipeline retenu :</strong> preprocessing + PCA + SMOTE + Logistic Regression
            </p>
            <p>
              Ce modele a ete choisi car il offre un <strong>recall eleve</strong>, un <strong>ROC-AUC solide</strong> et un <strong>F1-score legerement meilleur avec PCA</strong>.
            </p>
            <p>
              D'un point de vue medical, la priorite est de <strong>reduire les faux negatifs</strong>, donc de ne pas manquer des patients a risque.
            </p>
            <p>
              La conclusion metier est claire : dans ce projet, <strong>la priorite est donnee au recall</strong> plutot qu'a la seule accuracy.
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default AboutModel
