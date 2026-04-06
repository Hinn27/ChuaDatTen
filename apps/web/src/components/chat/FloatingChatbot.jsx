import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChatMutation } from '../../hooks/useShopQueries.js'
import './FloatingChatbot.css'

/**
 * Floating chatbot UI for asking /api/chat.
 */
export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: 'Xin chao, minh la AI Refood. Ban muon tim mon gi?' },
  ])

  const chatMutation = useChatMutation()
  const isTyping = chatMutation.isPending
  const canSend = useMemo(() => input.trim() && !isTyping, [input, isTyping])

  /**
   * Submit a message to backend chat endpoint.
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleSubmit(event) {
    event.preventDefault()
    const text = input.trim()
    if (!text || isTyping) return

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text }])
    setInput('')

    try {
      const answer = await chatMutation.mutateAsync(text)
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: answer || 'AI chua co cau tra loi phu hop.' }])
    } catch {
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: 'assistant', text: 'Khong the ket noi chatbot luc nay. Vui long thu lai.' }])
    }
  }

  return (
    <div className="chatbot-wrap">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Floating chatbot">
          <header className="chatbot-header">
            <div>
              <strong>AI Refood</strong>
              <span>Tu van mon an nhanh</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Dong chatbot">x</button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <article key={message.id} className={`chatbot-msg ${message.role === 'user' ? 'is-user' : 'is-ai'}`}>
                {message.role === 'user' ? (
                  <p>{message.text}</p>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                )}
              </article>
            ))}
            {isTyping && <div className="chatbot-typing">AI dang go...</div>}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhap cau hoi..."
              aria-label="Nhap tin nhan"
            />
            <button type="submit" disabled={!canSend}>Gui</button>
          </form>
        </section>
      )}

      <button className="chatbot-fab" type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Mo chatbot">
        AI
      </button>
    </div>
  )
}
