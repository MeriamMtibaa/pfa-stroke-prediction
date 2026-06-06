import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Activity } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'

function Hero() {
  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('patient-assessment')
    if (assessmentSection) {
      assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToAbout = () => {
    window.location.href = '/about'
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 px-4 md:px-6 medical-grid-bg">
      {/* Background decoration */}
      <AnimatedBackground />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgb(var(--accent)) 0%, transparent 70%)' }}>
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgb(var(--primary)) 0%, transparent 70%)' }}>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm font-semibold"
              style={{ 
                background: 'rgba(var(--accent), 0.1)',
                borderColor: 'rgba(var(--accent), 0.3)',
                color: 'rgb(var(--accent))'
              }}
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Explainable AI • Clinical-Grade Accuracy</span>
              <span className="sm:hidden">AI-Powered Predictions</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(var(--card-foreground))] leading-[1.1]">
              AI-Powered Stroke
              <br />
              <span className="gradient-text">Risk Assessment</span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-[rgb(var(--muted-foreground))] max-w-2xl leading-relaxed">
              Predict stroke risk using machine learning and clinical indicators. 
              Advanced AI models provide real-time risk analysis for better clinical decision support.
            </p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4"
            >
              <button 
                onClick={scrollToAssessment}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToAbout}
                className="btn-secondary"
              >
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8"
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--card-foreground))]">94%</div>
                <div className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--card-foreground))]">&lt;120ms</div>
                <div className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">Response</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[rgb(var(--card-foreground))]">3 Models</div>
                <div className="text-xs md:text-sm text-[rgb(var(--muted-foreground))]">Compared</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Medical Illustration */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Floating brain illustration */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
                     style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))' }}>
                </div>
                <div className="relative glass-card rounded-3xl p-12 flex items-center justify-center">
                  <Brain className="w-64 h-64 text-[rgb(var(--accent))]" strokeWidth={1} />
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute -top-8 -left-8 glass-card rounded-2xl p-4 shadow-xl"
              >
                <Activity className="w-8 h-8 text-[rgb(var(--primary))]" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-8 -right-8 glass-card rounded-2xl p-6 shadow-xl"
              >
                <div className="text-2xl font-bold text-[rgb(var(--card-foreground))]">AI</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
