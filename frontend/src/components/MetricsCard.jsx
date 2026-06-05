import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatMetric } from '../lib/utils'

function MetricsCard({ metrics, loading, error }) {
  if (loading) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-40 bg-slate-200 rounded"></div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8"
      >
        <p className="text-red-600">{error}</p>
      </motion.div>
    )
  }

  const metricsData = [
    { name: 'Accuracy', value: metrics?.metrics?.accuracy || 0, color: '#0ea5e9' },
    { name: 'Precision', value: metrics?.metrics?.precision || 0, color: '#8b5cf6' },
    { name: 'Recall', value: metrics?.metrics?.recall || 0, color: '#10b981' },
    { name: 'F1-Score', value: metrics?.metrics?.f1_score || 0, color: '#f59e0b' },
    { name: 'ROC-AUC', value: metrics?.metrics?.roc_auc || 0, color: '#ec4899' },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card rounded-3xl p-8"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Model Performance</h3>
      
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              domain={[0, 1]}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => formatMetric(value, 4)}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {metricsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metric.color }}
              ></div>
              <p className="text-xs font-medium text-slate-600">{metric.name}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {formatMetric(metric.value, 3)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default MetricsCard
