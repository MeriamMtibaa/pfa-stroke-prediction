import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

function StatusCard({ icon: Icon, label, value, status, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="metric-card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
          status === 'operational' && "bg-emerald-500/10 text-emerald-600",
          status === 'warning' && "bg-amber-500/10 text-amber-600",
          status === 'error' && "bg-red-500/10 text-red-600",
          !status && "bg-sky-500/10 text-sky-600"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          )}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </motion.div>
  )
}

export default StatusCard
