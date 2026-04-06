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
    { id: 'welcome', role: 'assistant', text: 'Xin chào, mình là AI Refood. Bạn muốn tìm món gì?' },
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
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: answer || 'AI chưa có câu trả lời phù hợp.' }])
    } catch {
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: 'assistant', text: 'Không thể kết nối chatbot lúc này. Vui lòng thử lại.' }])
    }
  }

  return (
    <div className="chatbot-wrap">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Floating chatbot">
          <header className="chatbot-header">
            <div>
              <strong>AI Refood</strong>
              <span>Tư vấn món ăn nhanh</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Đóng chatbot">x</button>
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
            {isTyping && <div className="chatbot-typing">AI đang gõ...</div>}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi..."
              aria-label="Nhập tin nhắn"
            />
            <button type="submit" disabled={!canSend}>Gửi</button>
          </form>
        </section>
      )}

      <button className="chatbot-fab" type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Mở chatbot">
        AI
      </button>
    </div>
  )
}
