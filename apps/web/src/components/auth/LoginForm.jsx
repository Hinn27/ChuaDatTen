import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import useAuthStore from '../../stores/useAuthStore.js'

/**
 * LoginForm — form đăng nhập
 * Gọi trực tiếp Supabase Auth signInWithPassword()
 *
 * @param {Object} props
 * @param {Function} [props.onSuccess] - Callback sau khi login thành công
 * @param {Function} [props.onSwitchToRegister] - Chuyển sang RegisterForm
 */
export function LoginForm({ onSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login, loading, error, clearError } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    const success = await login(email, password)
    if (success && onSuccess) {
      onSuccess()
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, textAlign: 'center', mb: 1, color: '#1A1A2E' }}
      >
        Đăng Nhập
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}
      >
        Chào mừng bạn quay lại 🍽️
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          py: 1.5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
          boxShadow: '0 4px 16px rgba(255,75,43,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #e0412a, #e88a25)',
          },
          '&.Mui-disabled': {
            background: 'grey.300',
          },
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Đăng Nhập'}
      </Button>

      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          mt: 3,
          color: 'text.secondary',
        }}
      >
        Chưa có tài khoản?{' '}
        <Box
          component="span"
          onClick={onSwitchToRegister}
          sx={{
            color: '#FF4B2B',
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Đăng ký ngay
        </Box>
      </Typography>
    </Box>
  )
}
