import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, TrendingUp, AlertCircle, Award, Database, Cpu, CheckCircle, Activity, GitBranch, Layers, Filter, BarChart3, Shuffle, Zap } from 'lucide-react'
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'rgb(var(--background))' }}>
        <div className="animate-pulse space-y-4">
          <div className="h-12 rounded w-64" style={{ background: 'rgb(var(--border))' }}></div>
          <div className="h-4 rounded w-48" style={{ background: 'rgb(var(--border))' }}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'rgb(var(--background))' }}>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const timelineSteps = [
    { icon: Database, title: 'Dataset', description: 'Healthcare stroke dataset with 5,110 records' },
    { icon: Filter, title: 'Preprocessing', description: 'Data cleaning and feature engineering' },
    { icon: Layers, title: 'Encoding', description: 'One-hot encoding for categorical features' },
    { icon: Activity, title: 'Scaling', description: 'StandardScaler normalization' },
    { icon: GitBranch, title: 'PCA', description: 'Dimensionality reduction optimization' },
    { icon: Shuffle, title: 'SMOTE', description: 'Balancing imbalanced classes' },
    { icon: Cpu, title: 'Training', description: 'Logistic Regression with optimization' },
    { icon: Zap, title: 'Prediction', description: 'Real-time risk assessment' },
  ]

  const features = [
    {
      icon: Target,
      title: 'High Recall Optimization',
      description: 'Optimized to minimize false negatives, ensuring high-risk patients are not missed',
      color: 'red'
    },
    {
      icon: Brain,
      title: 'Explainable AI',
      description: 'Full transparency with feature importance for clinical interpretation',
      color: 'primary'
    },
    {
      icon: Database,
      title: 'Comprehensive Features',
      description: 'Analyzes demographics, medical history, lifestyle, and clinical metrics',
      color: 'secondary'
    },
    {
      icon: Cpu,
      title: 'Fast Inference',
      description: 'Real-time predictions with sub-second response times for clinical workflows',
      color: 'accent'
    },
  ]

  return (
    <main className="min-h-screen py-8 md:py-12 medical-grid-bg" style={{ background: 'rgb(var(--background))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm font-semibold mb-4 md:mb-6"
               style={{ 
                 background: 'rgba(var(--accent), 0.1)',
                 borderColor: 'rgba(var(--accent), 0.3)',
                 color: 'rgb(var(--accent))'
               }}>
            <Award className="w-3 h-3 md:w-4 md:h-4" />
            <span>Production-Ready ML Model</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-[rgb(var(--card-foreground))] mb-3 md:mb-4">
            About the Model
          </h1>
          <p className="text-base md:text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto px-4">
            Learn about the machine learning pipeline powering stroke risk predictions
          </p>
        </motion.div>

        {/* Model Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-6 md:mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                 style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--card-foreground))] mb-2">
                {modelInfo?.model_name}
              </h2>
              <p className="text-sm md:text-base text-[rgb(var(--muted-foreground))] mb-6">{modelInfo?.pipeline_type}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-xl" style={{ background: 'rgba(var(--muted), 0.5)' }}>
                  <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] font-semibold mb-1">Algorithm</p>
                  <p className="text-base md:text-lg font-bold text-[rgb(var(--card-foreground))]">Logistic Regression</p>
                </div>
                <div className="p-3 md:p-4 rounded-xl" style={{ background: 'rgba(var(--muted), 0.5)' }}>
                  <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] font-semibold mb-1">Dimensionality</p>
                  <p className="text-base md:text-lg font-bold text-[rgb(var(--card-foreground))]">PCA Optimized</p>
                </div>
                <div className="p-3 md:p-4 rounded-xl" style={{ background: 'rgba(var(--muted), 0.5)' }}>
                  <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] font-semibold mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                    <p className="text-base md:text-lg font-bold text-emerald-600">Production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ML Pipeline Timeline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-6 md:mb-8"
        >
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                 style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
              <GitBranch className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] leading-tight">ML Pipeline</h2>
              <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] leading-tight mt-0.5 hidden sm:block">End-to-end machine learning workflow</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 hidden sm:block" 
                 style={{ background: 'linear-gradient(to bottom, rgb(var(--primary)), rgb(var(--accent)))' }}>
            </div>

            <div className="space-y-4 md:space-y-6">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-3 md:gap-6 items-center"
                >
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                       style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))' }}>
                    <step.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1 glass-card p-3 md:p-4 rounded-xl">
                    <h3 className="text-sm md:text-base font-bold text-[rgb(var(--card-foreground))] mb-1">{step.title}</h3>
                    <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg`}
                   style={{ background: feature.color === 'red' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : `linear-gradient(135deg, rgb(var(--${feature.color})), rgb(var(--accent)))` }}>
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-base md:text-xl font-bold text-[rgb(var(--card-foreground))] mb-2">{feature.title}</h3>
              <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-6 md:mb-8"
        >
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                 style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] leading-tight">Performance Metrics</h2>
              <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] leading-tight mt-0.5 hidden sm:block">Validation set results</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { label: 'Accuracy', value: metrics?.metrics?.accuracy, icon: Target },
              { label: 'Precision', value: metrics?.metrics?.precision, icon: CheckCircle },
              { label: 'Recall', value: metrics?.metrics?.recall, icon: Activity },
              { label: 'F1-Score', value: metrics?.metrics?.f1_score, icon: TrendingUp },
              { label: 'ROC-AUC', value: metrics?.metrics?.roc_auc, icon: Zap },
            ].map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div 
                  key={index} 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center p-3 md:p-4 rounded-xl"
                  style={{ background: 'rgba(var(--muted), 0.5)' }}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-[rgb(var(--accent))]" />
                  <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 gradient-text">
                    {formatMetric(metric.value, 3)}
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-[rgb(var(--muted-foreground))]">{metric.label}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Clinical Notes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="p-4 md:p-6 bg-blue-500/10 border-l-4 border-blue-600 rounded-xl"
        >
          <h3 className="text-base md:text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
            Clinical Usage Note
          </h3>
          <p className="text-xs md:text-sm text-blue-600">
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
