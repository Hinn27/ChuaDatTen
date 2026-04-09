import { useAuthStore } from '../stores/useAuthStore'

/**
 * Custom hook cho authentication
 * @returns {Object} { register, login, logout, getCurrentUser, user, token, isLoggedIn, loading, error }
 */
export function useAuth() {
    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const loading = useAuthStore((state) => state.loading)
    const error = useAuthStore((state) => state.error)
    const login = useAuthStore((state) => state.login)
    const register = useAuthStore((state) => state.register)
    const logout = useAuthStore((state) => state.logout)
    const getCurrentUser = useAuthStore((state) => state.getCurrentUser)

    return {
        user,
        token,
        isLoggedIn,
        loading,
        error,
        register,
        login,
        logout,
        getCurrentUser,
    }
}
