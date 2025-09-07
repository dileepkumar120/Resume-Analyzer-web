import axios from 'axios'

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const resumeAPI = {
  uploadResume: async file => {
    const formData = new FormData()
    formData.append('resume', file)

    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  getAllResumes: async () => {
    const response = await api.get('/resumes')
    return response.data
  },

  getResumeById: async id => {
    const response = await api.get(`/resumes/${id}`)
    return response.data
  },
}
