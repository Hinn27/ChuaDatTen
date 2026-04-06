import { Navigate, Route, Routes } from 'react-router-dom'
import CheckoutPage from '../../features/checkout/pages/CheckoutPage.jsx'
import { MemberCartPage } from '../../features/member-flow/pages/MemberCartPage.jsx'
import { MemberProductDetailPage } from '../../features/member-flow/pages/MemberProductDetailPage.jsx'
import { MemberProductsPage } from '../../features/member-flow/pages/MemberProductsPage.jsx'
import { MemberShopPage } from '../../features/member-flow/pages/MemberShopPage.jsx'
import { MemberGuard } from './MemberGuard.jsx'

/**
 * AppRouter — toàn bộ route của web app.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/a/shop" replace />} />

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

      <Route path="*" element={<Navigate to="/a/shop" replace />} />
    </Routes>
  )
}
