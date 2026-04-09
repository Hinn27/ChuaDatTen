import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore'

/**
 * Axios API client instance
 * BaseURL: từ env hoặc localhost:3000/api/v1
 * Includes JWT interceptor và error handling
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request Interceptor: Inject JWT token
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Response Interceptor: Handle errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - logout user
      const { logout } = useAuthStore.getState()
      logout()
      window.location.href = '/login'
    }

    if (error.response?.status === 403) {
      console.error('Permission denied')
    }

    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data)
    }

    return Promise.reject(error)
  }
)

export default api
