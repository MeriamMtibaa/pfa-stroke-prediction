import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, Activity, TrendingUp, Loader2, UserPlus, BrainCircuit, Stethoscope } from 'lucide-react'
import { getFormOptions, getSamplePatient, predictAllModels, predictStroke } from '../api/strokeApi'

const initialFormData = {
  gender: '',
  age: '',
  hypertension: '',
  heart_disease: '',
  ever_married: '',
  work_type: '',
  Residence_type: '',
  avg_glucose_level: '',
  bmi: '',
  smoking_status: '',
}

function PatientForm({ onPrediction, onAllPredictions }) {
  const [formOptions, setFormOptions] = useState(null)
  const [samplePatient, setSamplePatient] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    async function loadFormData() {
      setLoading(true)
      setError('')

      try {
        const [optionsResponse, sampleResponse] = await Promise.all([
          getFormOptions(),
          getSamplePatient(),
        ])

        setFormOptions(optionsResponse.data)
        setSamplePatient(sampleResponse.data)
      } catch (loadError) {
        setError(loadError.message || 'Error loading form data')
      } finally {
        setLoading(false)
      }
    }

    loadFormData()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleLoadSample() {
    if (!samplePatient) return

    setFormData({
      ...samplePatient,
      age: String(samplePatient.age),
      hypertension: String(samplePatient.hypertension),
      heart_disease: String(samplePatient.heart_disease),
      avg_glucose_level: String(samplePatient.avg_glucose_level),
      bmi: String(samplePatient.bmi),
    })
    setError('')
  }

  function validateForm() {
    const requiredFields = Object.entries(formData)
    const missingField = requiredFields.find(([, value]) => value === '')

    if (missingField) {
      return 'All patient fields are required'
    }

    if (Number(formData.age) < 0 || Number(formData.avg_glucose_level) < 0 || Number(formData.bmi) < 0) {
      return 'Numeric values must be positive'
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    const patientData = {
      gender: formData.gender,
      age: Number(formData.age),
      hypertension: Number(formData.hypertension),
      heart_disease: Number(formData.heart_disease),
      ever_married: formData.ever_married,
      work_type: formData.work_type,
      Residence_type: formData.Residence_type,
      avg_glucose_level: Number(formData.avg_glucose_level),
      bmi: Number(formData.bmi),
      smoking_status: formData.smoking_status,
    }

    setSubmitting(true)
    setError('')

    try {
      const [response, allModelsResponse] = await Promise.all([
        predictStroke(patientData),
        predictAllModels(patientData),
      ])

      onPrediction({
        request: patientData,
        response: response.data,
      })
      
      if (onAllPredictions) {
        onAllPredictions({
          request: patientData,
          response: allModelsResponse.data,
        })
      }
    } catch (submitError) {
      const message =
        submitError.response?.data?.detail ||
        submitError.message ||
        'Prediction error'
      setError(message)
      onPrediction({
        request: patientData,
        response: null,
        error: message,
      })
      if (onAllPredictions) {
        onAllPredictions({
          request: patientData,
          response: null,
          error: message,
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const sections = [
    {
      title: 'Demographics',
      icon: User,
      fields: ['gender', 'age', 'ever_married', 'work_type', 'Residence_type'],
      color: 'rgb(var(--primary))'
    },
    {
      title: 'Medical History',
      icon: Heart,
      fields: ['hypertension', 'heart_disease'],
      color: 'rgb(var(--secondary))'
    },
    {
      title: 'Lifestyle',
      icon: Activity,
      fields: ['smoking_status'],
      color: 'rgb(var(--accent))'
    },
    {
      title: 'Clinical Metrics',
      icon: TrendingUp,
      fields: ['avg_glucose_level', 'bmi'],
      color: 'rgb(var(--primary))'
    }
  ]

  const fieldLabels = {
    gender: 'Gender',
    age: 'Age',
    hypertension: 'Hypertension',
    heart_disease: 'Heart Disease',
    ever_married: 'Marital Status',
    work_type: 'Work Type',
    Residence_type: 'Residence Type',
    avg_glucose_level: 'Average Glucose Level (mg/dL)',
    bmi: 'BMI (kg/m²)',
    smoking_status: 'Smoking Status',
  }

  return (
    <motion.div
      id="patient-assessment"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="glass-card rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgb(var(--accent)), transparent)' }}>
      </div>

      <div className="relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                 style={{ background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))' }}>
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-2xl font-bold text-[rgb(var(--card-foreground))] leading-tight">Patient Assessment</h3>
              <p className="text-xs md:text-sm text-[rgb(var(--muted-foreground))] leading-tight mt-0.5">Enter clinical information for risk analysis</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={!samplePatient || loading}
            className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg whitespace-nowrap"
            style={{ 
              background: 'rgba(var(--accent), 0.1)',
              color: 'rgb(var(--accent))'
            }}
          >
            <UserPlus className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Load Sample Patient</span>
            <span className="sm:hidden">Sample</span>
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Section navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin -mx-2 px-2">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSection(index)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all shadow-md ${
                    currentSection === index
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--border))]'
                  }`}
                  style={currentSection === index ? {
                    background: 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))'
                  } : {}}
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                </button>
              )
            })}
          </div>

          {/* Form fields with animation */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {sections[currentSection].fields.map((fieldName) => {
              const isSelect = ['gender', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status'].includes(fieldName)
              const isNumber = ['age', 'avg_glucose_level', 'bmi'].includes(fieldName)

              return (
                <div key={fieldName} className="space-y-2">
                  <label className="block text-sm font-semibold text-[rgb(var(--card-foreground))]">
                    {fieldLabels[fieldName]}
                  </label>
                  {isSelect ? (
                    <select
                      name={fieldName}
                      value={formData[fieldName]}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading || submitting}
                    >
                      <option value="">Select...</option>
                      {formOptions?.[fieldName]?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={fieldName}
                      type={isNumber ? 'number' : 'text'}
                      min={isNumber ? '0' : undefined}
                      step={fieldName === 'avg_glucose_level' ? '0.01' : '0.1'}
                      value={formData[fieldName]}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading || submitting}
                      placeholder={isNumber ? 'Enter value...' : 'Enter text...'}
                    />
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Progress indicator */}
          <div className="flex gap-2 justify-center">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSection ? 'w-8' : 'w-1.5'
                }`}
                style={{
                  background: index === currentSection 
                    ? 'linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent)))'
                    : 'rgb(var(--border))'
                }}
              />
            ))}
          </div>

          {/* Submit button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 md:py-4 text-base md:text-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  <span className="hidden sm:inline">Analyzing Patient Data...</span>
                  <span className="sm:hidden">Analyzing...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Predict Stroke Risk</span>
                  <span className="sm:hidden">Predict Risk</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default PatientForm
