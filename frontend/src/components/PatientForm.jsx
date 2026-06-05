import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, Activity, TrendingUp, Loader2, FileUser } from 'lucide-react'
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
    
    console.log('Form submission started')

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

    console.log('Patient data:', patientData)

    setSubmitting(true)
    setError('')

    try {
      console.log('Calling prediction APIs...')
      const [response, allModelsResponse] = await Promise.all([
        predictStroke(patientData),
        predictAllModels(patientData),
      ])

      console.log('Prediction response:', response.data)
      console.log('All models response:', allModelsResponse.data)

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
      
      console.log('Prediction completed successfully')
    } catch (submitError) {
      console.error('Prediction error:', submitError)
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
      console.log('Form submission ended')
    }
  }

  const sections = [
    {
      title: 'Demographics',
      icon: User,
      fields: ['gender', 'age', 'ever_married', 'work_type', 'Residence_type']
    },
    {
      title: 'Medical History',
      icon: Heart,
      fields: ['hypertension', 'heart_disease']
    },
    {
      title: 'Lifestyle',
      icon: Activity,
      fields: ['smoking_status']
    },
    {
      title: 'Clinical Metrics',
      icon: TrendingUp,
      fields: ['avg_glucose_level', 'bmi']
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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="glass-card rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Patient Assessment</h3>
          <p className="text-slate-500 mt-1">Enter patient information for risk analysis</p>
        </div>
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={!samplePatient || loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors disabled:opacity-50"
        >
          <FileUser className="w-4 h-4" />
          Load Sample
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSection(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  currentSection === index
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.title}
              </button>
            )
          })}
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections[currentSection].fields.map((fieldName) => {
            const isSelect = ['gender', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status'].includes(fieldName)
            const isNumber = ['age', 'avg_glucose_level', 'bmi'].includes(fieldName)

            return (
              <div key={fieldName} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
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
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Submit button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting || loading}
            className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                Predict Risk
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default PatientForm
