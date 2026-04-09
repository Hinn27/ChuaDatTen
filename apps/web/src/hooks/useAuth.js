import { useAuthStore } from '../stores/useAuthStore'

/**
 * Custom hook cho authentication
 * @returns {Object} { register, login, logout, getCurrentUser, user, token, isLoggedIn, loading, error }
 */
export function useAuth() {
    const { user, token, isLoggedIn, loading, error, login, register, logout, getCurrentUser } = useAuthStore()

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
