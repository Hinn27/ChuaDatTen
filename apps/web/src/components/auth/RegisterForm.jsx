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
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import useAuthStore from '../../stores/useAuthStore.js'

/**
 * RegisterForm — form đăng ký tài khoản mới
 * Gọi trực tiếp Supabase Auth signUp()
 *
 * @param {Object} props
 * @param {Function} [props.onSuccess] - Callback sau khi register thành công
 * @param {Function} [props.onSwitchToLogin] - Chuyển về LoginForm
 */
export function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')

  const { register, loading, error, clearError } = useAuthStore()

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setLocalError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    setLocalError('')

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp.')
      return
    }
    if (formData.password.length < 6) {
      setLocalError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }

    const success = await register(formData.email, formData.password, {
      fullName: formData.fullName,
      phone: formData.phone,
    })
    if (success && onSuccess) {
      onSuccess()
    }
  }

  const displayError = localError || error

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
        Đăng Ký
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}
      >
        Tạo tài khoản mới để bắt đầu giải cứu thức ăn 🌱
      </Typography>

      {displayError && (
        <Alert
          severity="error"
          sx={{ mb: 2, borderRadius: 2 }}
          onClose={() => { setLocalError(''); clearError() }}
        >
          {displayError}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Họ và tên"
        value={formData.fullName}
        onChange={handleChange('fullName')}
        required
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Số điện thoại"
        value={formData.phone}
        onChange={handleChange('phone')}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
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
        value={formData.password}
        onChange={handleChange('password')}
        required
        sx={{ mb: 2 }}
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

      <TextField
        fullWidth
        label="Xác nhận mật khẩu"
        type={showPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        required
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: 'text.disabled' }} />
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
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Tạo Tài Khoản'}
      </Button>

      <Typography
        variant="body2"
        sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}
      >
        Đã có tài khoản?{' '}
        <Box
          component="span"
          onClick={onSwitchToLogin}
          sx={{
            color: '#FF4B2B',
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Đăng nhập
        </Box>
      </Typography>
    </Box>
  )
}
