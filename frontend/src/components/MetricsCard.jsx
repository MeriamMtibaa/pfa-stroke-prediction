import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { formatMetric } from '../lib/utils'
import { Target, TrendingUp, Shield, Activity, Zap } from 'lucide-react'

function MetricsCard({ metrics, loading, error }) {
  if (loading) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[rgb(var(--border))] rounded w-1/3"></div>
          <div className="h-40 bg-[rgb(var(--border))] rounded"></div>
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
    { 
      name: 'Accuracy', 
      value: metrics?.metrics?.accuracy || 0, 
      color: 'rgb(var(--primary))',
      icon: Target,
      description: 'Overall correctness'
    },
    { 
      name: 'Precision', 
      value: metrics?.metrics?.precision || 0, 
      color: 'rgb(var(--secondary))',
      icon: Shield,
      description: 'Positive prediction accuracy'
    },
    { 
      name: 'Recall', 
      value: metrics?.metrics?.recall || 0, 
      color: 'rgb(var(--accent))',
      icon: Activity,
      description: 'True positive detection'
    },
    { 
      name: 'F1-Score', 
      value: metrics?.metrics?.f1_score || 0, 
      color: '#f59e0b',
      icon: TrendingUp,
      description: 'Harmonic mean'
    },
    { 
      name: 'ROC-AUC', 
      value: metrics?.metrics?.roc_auc || 0, 
      color: '#ec4899',
      icon: Zap,
      description: 'Classification performance'
    },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgb(var(--primary)), transparent)' }}>
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
               style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
            <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] leading-tight">Model Performance</h3>
            <p className="text-sm md:text-base text-[rgb(var(--muted-foreground))] leading-tight mt-0.5 hidden sm:block">Key metrics and evaluation scores</p>
          </div>
        </div>
        
        <div className="mb-6 md:mb-8">
          <ResponsiveContainer width="100%" height={240} className="md:!h-[280px]">
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'rgb(var(--border))' }}
              />
              <YAxis 
                domain={[0, 1]}
                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'rgb(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgb(var(--card))',
                  border: '1px solid rgb(var(--border))',
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div 
                key={index} 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-3 md:p-4 rounded-xl transition-all hover:shadow-md"
                style={{ background: 'rgba(var(--muted), 0.5)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3 h-3 md:w-4 md:h-4" style={{ color: metric.color }} />
                  <p className="text-[10px] md:text-xs font-semibold text-[rgb(var(--muted-foreground))]">{metric.name}</p>
                </div>
                <p className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] mb-1">
                  {formatMetric(metric.value, 3)}
                </p>
                <p className="text-[10px] md:text-xs text-[rgb(var(--muted-foreground))] hidden sm:block">{metric.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default MetricsCard
