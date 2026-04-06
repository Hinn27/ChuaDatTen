import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { RestaurantMenuPage } from './pages/RestaurantMenuPage.jsx';
import { RestaurantOrderPage } from './pages/RestaurantOrderPage.jsx';
import { FloatingChatbot } from './components/chat/FloatingChatbot.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:slug" element={<RestaurantMenuPage />} />
        <Route path="/restaurant/:slug/order" element={<RestaurantOrderPage />} />
      </Routes>
      <FloatingChatbot />
    </BrowserRouter>
  );
}

export default App;
