import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

/**
 * Route wrapper — chỉ cho phép truy cập nếu đã đăng nhập
 * Chưa login → redirect về /auth
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ProtectedRoute({ children }) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const loading = useAuthStore((state) => state.loading);

    if (loading) {
        return <LoadingSpinner fullPage message="Đang xác thực..." />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}
