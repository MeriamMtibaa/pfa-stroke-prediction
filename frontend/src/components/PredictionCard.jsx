import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Activity, TrendingUp, AlertCircle, Brain } from 'lucide-react'

function PredictionCard({ predictionResult }) {
  if (!predictionResult) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-card rounded-3xl p-8"
      >
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(var(--muted), 1)' }}>
            <Activity className="w-10 h-10 text-[rgb(var(--muted-foreground))]" />
          </div>
          <h3 className="text-xl font-semibold text-[rgb(var(--card-foreground))] mb-2">No Prediction Yet</h3>
          <p className="text-[rgb(var(--muted-foreground))]">Complete the assessment form to see results</p>
        </div>
      </motion.div>
    )
  }

  if (predictionResult.error) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-card rounded-3xl p-8 border-red-500/30"
      >
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-[rgb(var(--card-foreground))] mb-2">Prediction Error</h3>
          <p className="text-red-600">{predictionResult.error}</p>
        </div>
      </motion.div>
    )
  }

  const { response } = predictionResult
  const riskPercentage = parseFloat(response?.risk_percentage) || 0
  const hasHighRisk = response?.prediction === 1
  
  // Determine risk level
  let riskLevel = 'Low'
  let riskColor = 'emerald'
  if (riskPercentage > 70) {
    riskLevel = 'High'
    riskColor = 'red'
  } else if (riskPercentage > 30) {
    riskLevel = 'Moderate'
    riskColor = 'amber'
  }

  // Progress ring SVG
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (riskPercentage / 100) * circumference

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
           style={{ background: `radial-gradient(circle, ${riskColor === 'red' ? '#ef4444' : riskColor === 'amber' ? '#f59e0b' : 'rgb(var(--accent))'}, transparent)` }}>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
               style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
            <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-bold text-[rgb(var(--card-foreground))] leading-tight">Risk Assessment</h3>
            <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] leading-tight mt-0.5">AI Prediction Result</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px]">
            <svg width="100%" height="100%" viewBox="0 0 180 180" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="rgb(var(--border))"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                stroke={riskColor === 'red' ? '#ef4444' : riskColor === 'amber' ? '#f59e0b' : '#10b981'}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--card-foreground))] leading-none mb-2">
                {riskPercentage.toFixed(1)}%
              </div>
              <div className={`text-sm md:text-base font-semibold ${
                riskColor === 'red' ? 'text-red-600' : 
                riskColor === 'amber' ? 'text-amber-600' : 
                'text-emerald-600'
              }`}>
                {riskLevel} Risk
              </div>
            </div>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm md:text-base ${
            riskColor === 'red' ? 'bg-red-500/10 text-red-600' : 
            riskColor === 'amber' ? 'bg-amber-500/10 text-amber-600' : 
            'bg-emerald-500/10 text-emerald-600'
          }`}>
            {riskColor === 'red' ? (
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
            ) : riskColor === 'amber' ? (
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
            )}
            <span>{response?.interpretation}</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 md:p-4 rounded-xl"
               style={{ background: 'rgba(var(--muted), 0.5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: 'rgba(var(--accent), 0.1)' }}>
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--accent))]" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-[rgb(var(--muted-foreground))] font-medium">Probability</p>
                <p className="text-sm md:text-lg font-bold text-[rgb(var(--card-foreground))]">
                  {response?.risk_probability?.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 md:p-4 rounded-xl"
               style={{ background: 'rgba(var(--muted), 0.5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: 'rgba(var(--primary), 0.1)' }}>
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--primary))]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs text-[rgb(var(--muted-foreground))] font-medium">Model Used</p>
                <p className="text-sm md:text-lg font-bold text-[rgb(var(--card-foreground))] truncate">
                  {response?.model_used}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`mt-4 md:mt-6 p-3 md:p-4 rounded-xl border-2 ${
          riskColor === 'red' 
            ? 'bg-red-500/10 border-red-500/30' 
            : riskColor === 'amber'
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <p className={`text-xs md:text-sm font-semibold ${
            riskColor === 'red' ? 'text-red-700' : 
            riskColor === 'amber' ? 'text-amber-700' : 
            'text-emerald-700'
          }`}>
            {riskColor === 'red'
              ? '⚠️ Immediate clinical evaluation recommended' 
              : riskColor === 'amber'
              ? '⚠️ Follow-up with healthcare provider advised'
              : '✓ Continue routine health monitoring'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PredictionCard
