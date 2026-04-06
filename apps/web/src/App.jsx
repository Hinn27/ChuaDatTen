import { AppRouter } from './app/router/index.jsx'
import { FloatingChatbot } from './components/chat/FloatingChatbot.jsx'

export default function App() {
  return (
    <>
      <AppRouter />
      <FloatingChatbot />
    </>
  )
}

