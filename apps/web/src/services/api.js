import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore'

/**
 * Axios API client instance
 * BaseURL:
 * - Dev: ưu tiên same-origin '/api/v1' để đi qua Vite proxy (tránh CORS trên browser)
 * - Prod: dùng VITE_API_BASE_URL nếu có, fallback localhost
 * Includes JWT interceptor và error handling
 */
const envBaseUrl = import.meta.env.VITE_API_BASE_URL
const defaultBaseUrl = import.meta.env.DEV
  ? '/api/v1'
  : 'http://localhost:3000/api/v1'

const api = axios.create({
  baseURL: envBaseUrl || defaultBaseUrl,
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
