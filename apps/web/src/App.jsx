import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RestaurantMenuPage } from './pages/RestaurantMenuPage'
import { RestaurantOrderPage } from './pages/RestaurantOrderPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { DashboardPage } from './pages/DashboardPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/menu/:id" element={<RestaurantMenuPage />} />
        <Route path="/restaurant/order/:id" element={<RestaurantOrderPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
