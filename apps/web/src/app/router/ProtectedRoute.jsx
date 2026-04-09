import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute — Guard for authenticated user routes
 * Redirects to login if user not authenticated
 */
export function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return null;
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
