import { Navigate, Route, Routes } from "react-router-dom";
import CheckoutPage from "../../features/checkout/pages/CheckoutPage.jsx";
import { MemberCartPage } from "../../features/member-flow/pages/MemberCartPage.jsx";
import { MemberProductDetailPage } from "../../features/member-flow/pages/MemberProductDetailPage.jsx";
import { MemberProductsPage } from "../../features/member-flow/pages/MemberProductsPage.jsx";
import { MemberShopPage } from "../../features/member-flow/pages/MemberShopPage.jsx";
import { HomePage } from "../../pages/HomePage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import MemberBCategoryPage from "../../pages/MemberBCategoryPage.jsx";
import MemberCCategoryPage from "../../pages/MemberCCategoryPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";
import OrderDetailPage from "../../pages/OrderDetailPage.jsx";
import OrdersPage from "../../pages/OrdersPage.jsx";
import ProfilePage from "../../pages/ProfilePage.jsx";
import RegisterPage from "../../pages/RegisterPage.jsx";
import { MemberGuard } from "./MemberGuard.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

/**
 * AppRouter — toàn bộ route của web app.
 */
export function AppRouter() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dedicated Member C Category Route */}
            <Route path="/c/shop" element={<MemberCCategoryPage />} />

            {/* Member Shop Flow */}
            <Route
                path="/:member/shop"
                element={
                    <MemberGuard>
                        <MemberShopPage />
                    </MemberGuard>
                }
            />
            <Route
                path="/:member/products"
                element={
                    <MemberGuard>
                        <MemberProductsPage />
                    </MemberGuard>
                }
            />
            <Route
                path="/:member/products/:id"
                element={
                    <MemberGuard>
                        <MemberProductDetailPage />
                    </MemberGuard>
                }
            />
            <Route
                path="/:member/cart"
                element={
                    <MemberGuard>
                        <MemberCartPage />
                    </MemberGuard>
                }
            />
            <Route
                path="/:member/checkout"
                element={
                    <MemberGuard>
                        <CheckoutPage />
                    </MemberGuard>
                }
            />

            {/* Member B Dedicated Category Route */}
            <Route
                path="/member-b/category"
                element={<MemberBCategoryPage />}
            />

            {/* Protected User Routes */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders/:orderId"
                element={
                    <ProtectedRoute>
                        <OrderDetailPage />
                    </ProtectedRoute>
                }
            />

            {/* Error Route */}
            <Route path="/not-found" element={<NotFoundPage />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
    );
}
