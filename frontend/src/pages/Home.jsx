import { useEffect, useState } from 'react'
import { CheckCircle, Activity, Brain, Zap } from 'lucide-react'
import Hero from '../components/Hero'
import StatusCard from '../components/StatusCard'
import PatientForm from '../components/PatientForm'
import PredictionCard from '../components/PredictionCard'
import MetricsCard from '../components/MetricsCard'
import MultiModelResults from '../components/MultiModelResults'
import { getHealth, getMetrics, getModelInfo } from '../api/strokeApi'

function Home() {
  const [health, setHealth] = useState(null)
  const [modelInfo, setModelInfo] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [predictionResult, setPredictionResult] = useState(null)
  const [allPredictions, setAllPredictions] = useState(null)
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
        setError(error.message || 'Error loading backend data')
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  return (
    <main className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-10">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatusCard
            icon={CheckCircle}
            label="API Status"
            value={loading ? 'Loading...' : health?.status || 'Unknown'}
            status={health?.status === 'healthy' ? 'operational' : 'error'}
            delay={0.1}
          />
          <StatusCard
            icon={Brain}
            label="Active Model"
            value={loading ? 'Loading...' : modelInfo?.model_name?.split(' ')[0] || 'N/A'}
            delay={0.2}
          />
          <StatusCard
            icon={Activity}
            label="Recall Score"
            value={loading ? '...' : `${(metrics?.metrics?.recall * 100 || 0).toFixed(1)}%`}
            trend={2.3}
            delay={0.3}
          />
          <StatusCard
            icon={Zap}
            label="Response Time"
            value="<120ms"
            status="operational"
            delay={0.4}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <PatientForm
              onPrediction={setPredictionResult}
              onAllPredictions={setAllPredictions}
            />
          </div>
          <div>
            <PredictionCard predictionResult={predictionResult} />
          </div>
        </div>

        {/* Model Comparison */}
        {allPredictions && (
          <div className="mb-12">
            <MultiModelResults allPredictions={allPredictions} />
          </div>
        )}

        {/* Metrics */}
        <div className="mb-12">
          <MetricsCard metrics={metrics} loading={loading} error={error} />
        </div>
      </div>
    </main>
  )
}

export default Home
