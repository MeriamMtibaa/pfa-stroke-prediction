import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

function SuccessAnimation({ show, message }) {
  if (!show) return null

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Prediction Complete
        </h3>
        <p className="text-slate-600 text-center">{message}</p>
      </motion.div>
    </motion.div>
  )
}

export default SuccessAnimation
