import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

function GradientCard({ 
  children, 
  className, 
  gradient = 'from-primary-500 to-primary-600',
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 group",
        "bg-gradient-to-br",
        gradient,
        className
      )}
    >
      {/* Animated shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      
      {children}
    </motion.div>
  )
}

export default GradientCard
