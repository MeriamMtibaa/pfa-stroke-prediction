import { motion } from 'framer-motion'
import { TrendingUp, Award, Target, CheckCircle, XCircle } from 'lucide-react'

function MultiModelResults({ allPredictions }) {
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

  const response = allPredictions.response
  const modelsDict = response.models || {}
  
  const models = Object.entries(modelsDict).map(([modelName, modelData]) => ({
    model_name: modelName,
    ...modelData
  }))
  
  const bestModelName = 'logistic_regression_pca'

  if (models.length === 0) {
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
      className="glass-card rounded-3xl p-8 col-span-full relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgb(var(--accent)), transparent)' }}>
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
               style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] leading-tight">Model Comparison</h3>
            <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] leading-tight mt-0.5 hidden sm:block">Comprehensive analysis across all ML models</p>
          </div>
        </div>

        {/* Desktop: Table view */}
        <div className="hidden lg:block overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="min-w-[800px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgb(var(--border))]">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-[rgb(var(--card-foreground))]">Model</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[rgb(var(--card-foreground))]">Prediction</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[rgb(var(--card-foreground))]">Risk %</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-[rgb(var(--card-foreground))]">Probability</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-[rgb(var(--card-foreground))]">Status</th>
                </tr>
              </thead>
              <tbody>
              {models.map((model, index) => {
                const isBest = model.model_name === bestModelName
                const hasHighRisk = model.prediction === 1
                
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`border-b border-[rgb(var(--border))] transition-colors ${
                      isBest ? 'bg-[rgb(var(--accent))]/5' : 'hover:bg-[rgb(var(--muted))]/50'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {isBest && (
                          <Award className="w-5 h-5 text-[rgb(var(--accent))]" />
                        )}
                        <div>
                          <div className="font-semibold text-[rgb(var(--card-foreground))]">
                            {model.model_name}
                          </div>
                          <div className="text-xs text-[rgb(var(--muted-foreground))]">
                            {model.pipeline_type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                        hasHighRisk 
                          ? 'bg-red-500/10 text-red-600' 
                          : 'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {hasHighRisk ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {model.label}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xl font-bold text-[rgb(var(--card-foreground))]">
                          {model.risk_percentage}%
                        </span>
                        <div className="w-24 bg-[rgb(var(--border))] rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              hasHighRisk ? 'bg-red-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${model.risk_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono text-sm text-[rgb(var(--muted-foreground))]">
                        {model.risk_probability?.toFixed(4)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {isBest && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                              style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))' }}>
                          <Target className="w-3 h-3" />
                          RECOMMENDED
                        </span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>

        {/* Mobile: Card view */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
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
                    ? 'border-[rgb(var(--accent))] shadow-lg'
                    : 'border-[rgb(var(--border))]'
                }`}
              >
                {isBest && (
                  <div className="absolute -top-3 right-4 flex items-center gap-1 px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg"
                       style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))' }}>
                    <Award className="w-3 h-3" />
                    RECOMMENDED
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[rgb(var(--card-foreground))] mb-1">{model.model_name}</h4>
                    <p className="text-xs text-[rgb(var(--muted-foreground))]">{model.pipeline_type}</p>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    hasHighRisk 
                      ? 'bg-red-500/10 text-red-600' 
                      : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {model.label}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[rgb(var(--muted-foreground))]">Risk</span>
                      <span className="text-2xl font-bold text-[rgb(var(--card-foreground))]">
                        {model.risk_percentage}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-[rgb(var(--border))] rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          hasHighRisk ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${model.risk_percentage}%` }}
                      ></div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[rgb(var(--muted-foreground))]">Probability</span>
                        <span className="font-mono text-[rgb(var(--card-foreground))]">
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

        <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl"
             style={{ background: 'rgba(var(--muted), 0.5)' }}>
          <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">
            <span className="font-semibold text-[rgb(var(--card-foreground))]">Clinical Note:</span> The recommended model is optimized 
            for clinical use with emphasis on recall (sensitivity) to minimize false negatives.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default MultiModelResults
