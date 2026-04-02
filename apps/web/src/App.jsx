import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RestaurantMenuPage } from './pages/RestaurantMenuPage'
import { RestaurantOrderPage } from './pages/RestaurantOrderPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/menu/:id" element={<RestaurantMenuPage />} />
        <Route path="/restaurant/order/:id" element={<RestaurantOrderPage />} />
      </Routes>
    </Router>
  )
}

export default App
