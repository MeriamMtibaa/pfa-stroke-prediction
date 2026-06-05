import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Activity, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Activity className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Prediction Yet</h3>
          <p className="text-slate-500">Complete the assessment form to see results</p>
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
        className="glass-card rounded-3xl p-8 border-red-200"
      >
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Prediction Error</h3>
          <p className="text-red-600">{predictionResult.error}</p>
        </div>
      </motion.div>
    )
  }

  const { response } = predictionResult
  const riskPercentage = parseFloat(response?.risk_percentage) || 0
  const hasHighRisk = response?.prediction === 1
  
  const chartData = [
    { name: 'Risk', value: riskPercentage },
    { name: 'No Risk', value: 100 - riskPercentage }
  ]
  
  const COLORS = hasHighRisk ? ['#ef4444', '#f1f5f9'] : ['#10b981', '#f1f5f9']

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      className="glass-card rounded-3xl p-8"
    >
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
          hasHighRisk ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {hasHighRisk ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="font-semibold">
            {hasHighRisk ? 'High Risk' : 'Low Risk'}
          </span>
        </div>
        
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          {response?.risk_percentage}%
        </h3>
        <p className="text-slate-500">{response?.interpretation}</p>
      </div>

      {/* Risk Gauge */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Probability</p>
              <p className="text-lg font-semibold text-slate-900">
                {response?.risk_probability?.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Model Used</p>
              <p className="text-lg font-semibold text-slate-900">
                {response?.model_used}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`mt-6 p-4 rounded-xl border-2 ${
        hasHighRisk 
          ? 'bg-red-50 border-red-200' 
          : 'bg-emerald-50 border-emerald-200'
      }`}>
        <p className={`text-sm font-medium ${
          hasHighRisk ? 'text-red-900' : 'text-emerald-900'
        }`}>
          {hasHighRisk 
            ? '⚠️ Immediate clinical evaluation recommended' 
            : '✓ Continue routine health monitoring'}
        </p>
      </div>
    </motion.div>
  )
}

export default PredictionCard
