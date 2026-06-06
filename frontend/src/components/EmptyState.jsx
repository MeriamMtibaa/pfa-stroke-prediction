import { motion } from 'framer-motion'

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6">{description}</p>
      {action && action}
    </motion.div>
  )
}

export default EmptyState
