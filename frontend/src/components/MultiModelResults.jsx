import { motion } from 'framer-motion'
import { TrendingUp, Award } from 'lucide-react'

function MultiModelResults({ allPredictions }) {
  // Debug: log the data structure
  console.log('MultiModelResults received:', allPredictions)
  
  if (!allPredictions || !allPredictions.response) {
    return null
  }

  if (allPredictions.error) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 col-span-full"
      >
        <p className="text-red-600">{allPredictions.error}</p>
      </motion.div>
    )
  }

  // Handle backend response structure: {models: {model_name: prediction}}
  const response = allPredictions.response
  const modelsDict = response.models || {}
  
  // Convert dictionary to array of models with their names
  const models = Object.entries(modelsDict).map(([modelName, modelData]) => ({
    model_name: modelName,
    ...modelData
  }))
  
  // Determine best model (the one loaded as final_model)
  const bestModelName = 'logistic_regression_pca' // Based on backend MODEL_NAME

  // If no models found, don't render
  if (models.length === 0) {
    console.log('No models data found, response was:', response)
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-3xl p-8 col-span-full"
      >
        <p className="text-amber-600">Model comparison data not available</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="glass-card rounded-3xl p-8 col-span-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-sky-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Model Comparison</h3>
          <p className="text-slate-500">All three models analyzed for this patient</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((model, index) => {
          const isBest = model.model_name === bestModelName
          const hasHighRisk = model.prediction === 1
          
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                isBest
                  ? 'bg-sky-50 border-sky-300 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {isBest && (
                <div className="absolute -top-3 right-4 flex items-center gap-1 px-3 py-1 bg-sky-600 text-white text-xs font-bold rounded-full shadow-lg">
                  <Award className="w-3 h-3" />
                  RECOMMENDED
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{model.model_name}</h4>
                  <p className="text-xs text-slate-500">{model.pipeline_type}</p>
                </div>

                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                  hasHighRisk 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {model.label}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Risk</span>
                    <span className="text-2xl font-bold text-slate-900">
                      {model.risk_percentage}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        hasHighRisk ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${model.risk_percentage}%` }}
                    ></div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Probability</span>
                      <span className="font-mono text-slate-700">
                        {model.risk_probability?.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Note:</span> The recommended model is optimized 
          for clinical use with emphasis on recall (sensitivity) to minimize false negatives.
        </p>
      </div>
    </motion.div>
  )
}

export default MultiModelResults
