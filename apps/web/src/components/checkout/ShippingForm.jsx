import { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import NoteIcon from '@mui/icons-material/Note'

/**
 * ShippingForm — form nhập thông tin giao hàng
 *
 * @param {Object} props
 * @param {Object} props.formData - { fullName, phone, address, note }
 * @param {Function} props.onChange - (field, value) => void
 */
export function ShippingForm({ formData, onChange }) {
  const handleChange = (field) => (e) => {
    onChange(field, e.target.value)
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Thông tin giao hàng
      </Typography>

      <TextField
        fullWidth
        label="Họ và tên"
        value={formData.fullName || ''}
        onChange={handleChange('fullName')}
        required
        sx={{ mb: 2.5 }}
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
        value={formData.phone || ''}
        onChange={handleChange('phone')}
        required
        sx={{ mb: 2.5 }}
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
        label="Địa chỉ giao hàng"
        value={formData.address || ''}
        onChange={handleChange('address')}
        required
        multiline
        rows={2}
        sx={{ mb: 2.5 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                <LocationOnIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Ghi chú (không bắt buộc)"
        value={formData.note || ''}
        onChange={handleChange('note')}
        multiline
        rows={2}
        sx={{ mb: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                <NoteIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  )
}
