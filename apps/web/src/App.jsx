<<<<<<< HEAD
import { FloatingChatbot } from './components/chat/FloatingChatbot.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
  return (
    <>
      <AppRouter />
      <FloatingChatbot />
    </>
  )
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
=======
import { AppRouter } from './app/router/index.jsx'

export default function App() {
  return <AppRouter />
}

>>>>>>> 5a7f1cb (refactor(web): chuẩn hoá router và shared constants)
