import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, TrendingUp, AlertCircle, Award, Database, Cpu, CheckCircle } from 'lucide-react'
import { getModelInfo, getMetrics } from '../api/strokeApi'
import { formatMetric } from '../lib/utils'

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
        const [modelResponse, metricsResponse] = await Promise.all([
          getModelInfo(),
          getMetrics(),
        ])

        setModelInfo(modelResponse.data)
        setMetrics(metricsResponse.data)
      } catch (err) {
        setError(err.message || 'Error loading model information')
      } finally {
        setLoading(false)
      }
    }

    loadModelData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-slate-200 rounded w-64"></div>
          <div className="h-4 bg-slate-200 rounded w-48"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Target,
      title: 'High Recall Optimization',
      description: 'Optimized to minimize false negatives, ensuring high-risk patients are not missed',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Brain,
      title: 'Explainable AI',
      description: 'Full transparency with SHAP values and feature importance for clinical interpretation',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Database,
      title: 'Comprehensive Features',
      description: 'Analyzes demographics, medical history, lifestyle, and clinical metrics',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Cpu,
      title: 'Fast Inference',
      description: 'Real-time predictions with sub-second response times for clinical workflows',
      color: 'text-emerald-600 bg-emerald-100'
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-700 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Production-Ready ML Model</span>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            About the Model
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Learn about the machine learning model powering stroke risk predictions
          </p>
        </motion.div>

        {/* Model Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {modelInfo?.model_name}
              </h2>
              <p className="text-slate-600 mb-4">{modelInfo?.pipeline_type}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 font-medium mb-1">Algorithm</p>
                  <p className="text-lg font-semibold text-slate-900">Logistic Regression</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 font-medium mb-1">Dimensionality</p>
                  <p className="text-lg font-semibold text-slate-900">PCA Optimized</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 font-medium mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <p className="text-lg font-semibold text-emerald-600">Production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:shadow-large transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Performance Metrics</h2>
              <p className="text-slate-500">Validation set results</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Accuracy', value: metrics?.metrics?.accuracy, color: 'primary' },
              { label: 'Precision', value: metrics?.metrics?.precision, color: 'purple' },
              { label: 'Recall', value: metrics?.metrics?.recall, color: 'emerald' },
              { label: 'F1-Score', value: metrics?.metrics?.f1_score, color: 'amber' },
              { label: 'ROC-AUC', value: metrics?.metrics?.roc_auc, color: 'pink' },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-${metric.color}-600 to-${metric.color}-400 bg-clip-text text-transparent`}>
                  {formatMetric(metric.value, 3)}
                </div>
                <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Clinical Notes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-xl"
        >
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Clinical Usage Note
          </h3>
          <p className="text-blue-800">
            This model is designed as a clinical decision support tool. All predictions should be 
            reviewed by qualified healthcare professionals. The model is optimized for high recall 
            (sensitivity) to minimize false negatives in stroke risk assessment, making it particularly 
            suitable for screening workflows.
          </p>
        </motion.div>
      </div>
    </main>
  )
}

export default AboutModel
