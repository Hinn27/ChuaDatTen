import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

/**
 * Profile Page
 * View and edit user profile
 */
export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleViewOrders = () => {
    navigate('/orders')
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Thông Tin Tài Khoản
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin cá nhân
          </Typography>

          <TextField
            fullWidth
            label="Email"
            value={user.email || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Họ và Tên"
            value={user.fullName || user.name || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Số điện thoại"
            value={user.phone || ''}
            margin="normal"
            disabled
          />

          <TextField
            fullWidth
            label="Địa chỉ"
            value={user.address || ''}
            margin="normal"
            disabled
            multiline
            rows={3}
          />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleViewOrders}>
              Xem Đơn Hàng
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
