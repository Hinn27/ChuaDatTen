import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Container, Paper, Alert } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

/**
 * Register Page
 * Email + password registration form with validation
 */
export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading, error, isLoggedIn } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Vui lòng điền tất cả các trường')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Email không hợp lệ')
      return
    }

    if (password.length < 8) {
      setFormError('Mật khẩu phải tối thiểu 8 ký tự')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Mật khẩu không khớp')
      return
    }

    try {
      await register(email, password, name)
      navigate('/')
    } catch (err) {
      setFormError(err.message || 'Đăng ký thất bại')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Đăng Ký
          </Typography>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || formError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Họ và Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              disabled={loading}
            />

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

            <TextField
              fullWidth
              label="Xác nhận mật khẩu"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </Button>
          </form>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Đã có tài khoản?{' '}
            <Typography
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
