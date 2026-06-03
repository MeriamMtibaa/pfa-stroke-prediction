import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getHealth() {
  return apiClient.get('/health')
}

export function getModelInfo() {
  return apiClient.get('/model-info')
}

export function getMetrics() {
  return apiClient.get('/metrics')
}

export function getFormOptions() {
  return apiClient.get('/form-options')
}

export function getSamplePatient() {
  return apiClient.get('/sample-patient')
}

export function predictStroke(patientData) {
  return apiClient.post('/predict', patientData)
}

export function predictAllModels(patientData) {
  return apiClient.post('/predict-all', patientData)
}
