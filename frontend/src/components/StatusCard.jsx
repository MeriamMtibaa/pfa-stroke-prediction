import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

function StatusCard({ icon: Icon, label, value, status, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="metric-card group relative overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl blur-xl" 
             style={{ background: 'radial-gradient(circle at 50% 50%, rgba(var(--accent), 0.15), transparent)' }}>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            {/* Status pulse for operational */}
            {status === 'operational' && (
              <div className="absolute inset-0 rounded-xl opacity-75 blur-md status-pulse"
                   style={{ background: 'rgb(var(--accent))' }}>
              </div>
            )}
            <div className={cn(
              "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg",
              status === 'operational' && "text-white",
              status === 'warning' && "bg-amber-500/10 text-amber-600",
              status === 'error' && "bg-red-500/10 text-red-600",
              !status && "text-white"
            )}
            style={
              status === 'operational' || !status
                ? { background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }
                : {}
            }
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>
          
          {trend && (
            <span className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full",
              trend > 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
            )}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-medium text-[rgb(var(--muted-foreground))]">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-[rgb(var(--card-foreground))] break-words">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default StatusCard
