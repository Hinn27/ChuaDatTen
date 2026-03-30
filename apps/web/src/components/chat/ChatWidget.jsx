import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Slide,
  Avatar,
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'

/**
 * ChatWidget — floating chatbot UI
 * Nổi ở góc phải dưới màn hình
 * Click mở khung chat nhỏ — gửi tin nhắn — nhận phản hồi từ API
 * API chatbot sẽ được tích hợp sau
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Xin chào! 👋 Tôi là trợ lý ảo của Refood. Bạn cần tôi giúp gì?',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: input.trim(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // TODO: Gọi API chatbot ở đây
    // const response = await api.post('/chatbot', { message: userMessage.text })
    // Tạm thời mock response sau 1s
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Cảm ơn bạn đã nhắn tin! Tính năng chatbot đang được phát triển. Hãy quay lại sau nhé! 🚀',
      }
      setMessages((prev) => [...prev, botReply])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      {/* Chat Window */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 100 },
            right: { xs: 16, sm: 24 },
            width: { xs: 'calc(100vw - 32px)', sm: 380 },
            maxHeight: 500,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
              color: '#fff',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Trợ lý Refood
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Luôn sẵn sàng hỗ trợ
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              maxHeight: 340,
              backgroundColor: '#FAFAFA',
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1,
                }}
              >
                {msg.role === 'bot' && (
                  <Avatar sx={{ width: 28, height: 28, backgroundColor: '#FF4B2B', fontSize: 14 }}>
                    🤖
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '75%',
                    px: 2,
                    py: 1,
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: msg.role === 'user' ? '#FF4B2B' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#1A1A2E',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 28, height: 28, backgroundColor: '#FF4B2B', fontSize: 14 }}>
                  🤖
                </Avatar>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '16px 16px 16px 4px',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Đang gõ...
                  </Typography>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            sx={{
              display: 'flex',
              gap: 1,
              p: 1.5,
              borderTop: '1px solid',
              borderColor: 'grey.200',
              backgroundColor: '#fff',
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              disabled={isTyping}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#F5F5F5',
                },
              }}
            />
            <IconButton
              type="submit"
              disabled={!input.trim() || isTyping}
              sx={{
                backgroundColor: '#FF4B2B',
                color: '#fff',
                '&:hover': { backgroundColor: '#e0412a' },
                '&.Mui-disabled': { backgroundColor: 'grey.300', color: '#fff' },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Paper>
      </Slide>

      {/* Floating Button */}
      <Fab
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(255,75,43,0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e0412a, #e88a25)',
            boxShadow: '0 6px 28px rgba(255,75,43,0.5)',
          },
          zIndex: 1300,
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  )
}
