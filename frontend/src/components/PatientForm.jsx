import { useEffect, useState } from 'react'

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
        setError(loadError.message || 'Erreur lors du chargement du formulaire.')
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
      return 'Tous les champs du patient doivent etre renseignes.'
    }

    if (Number(formData.age) < 0 || Number(formData.avg_glucose_level) < 0 || Number(formData.bmi) < 0) {
      return 'Les valeurs numeriques doivent etre positives.'
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
      onAllPredictions?.({
        request: patientData,
        response: allModelsResponse.data,
      })
    } catch (submitError) {
      const message =
        submitError.response?.data?.detail ||
        submitError.message ||
        'Erreur lors de la prediction.'
      setError(message)
      onPrediction({
        request: patientData,
        response: null,
        error: message,
      })
      onAllPredictions?.({
        request: patientData,
        response: null,
        error: message,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="card">
      <h2>Patient Form</h2>
      <p>Renseignez les informations du patient puis lancez la prediction.</p>

      {loading ? <p>Chargement des options du formulaire...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      <div className="button-row">
        <button type="button" onClick={handleLoadSample} disabled={!samplePatient || loading}>
          Charger exemple patient
        </button>
      </div>

      <form className="patient-form" onSubmit={handleSubmit}>
        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.gender?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Age
          <input name="age" type="number" min="0" step="0.1" value={formData.age} onChange={handleChange} />
        </label>

        <label>
          Hypertension
          <select name="hypertension" value={formData.hypertension} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.hypertension?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Heart disease
          <select name="heart_disease" value={formData.heart_disease} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.heart_disease?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ever married
          <select name="ever_married" value={formData.ever_married} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.ever_married?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Work type
          <select name="work_type" value={formData.work_type} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.work_type?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Residence type
          <select name="Residence_type" value={formData.Residence_type} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.Residence_type?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Avg glucose level
          <input
            name="avg_glucose_level"
            type="number"
            min="0"
            step="0.01"
            value={formData.avg_glucose_level}
            onChange={handleChange}
          />
        </label>

        <label>
          BMI
          <input name="bmi" type="number" min="0" step="0.1" value={formData.bmi} onChange={handleChange} />
        </label>

        <label>
          Smoking status
          <select name="smoking_status" value={formData.smoking_status} onChange={handleChange}>
            <option value="">Selectionner</option>
            {formOptions?.smoking_status?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="button-row">
          <button type="submit" disabled={submitting || loading}>
            {submitting ? 'Prediction en cours...' : 'Predire le risque'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default PatientForm
