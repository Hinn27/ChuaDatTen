import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Container, Paper, Alert } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

/**
 * Login Page
 * Email + password login form with validation
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error, isLoggedIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Validation
    if (!email || !password) {
      setFormError('Email và mật khẩu là bắt buộc')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Email không hợp lệ')
      return
    }

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setFormError(err.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Đăng Nhập
          </Typography>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || formError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </Button>
          </form>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Chưa có tài khoản?{' '}
            <Typography
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              Đăng ký
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
