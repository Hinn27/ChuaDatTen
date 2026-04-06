import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BFlowLayout } from '../components/BFlowLayout.jsx'
import useCartStore from '../../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export default function BCheckoutPage() {
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    setActiveMember('b')
  }, [setActiveMember])

  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '', note: '' })
  const [error, setError] = useState('')
  const [successCode, setSuccessCode] = useState('')

  const subtotal = getTotalPrice('b')
  const shippingFee = items.length ? 15000 : 0
  const total = subtotal + shippingFee

  const isEmpty = useMemo(() => items.length === 0, [items.length])

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      setError('Vui long nhap day du thong tin giao hang.')
      return
    }
    setError('')
    setSuccessCode(`B-ORD-${Date.now()}`)
    clearCart('b')
  }

  return (
    <BFlowLayout
      title="Checkout BunPho"
      subtitle="Trang thanh toan custom cho member B."
      source="mock"
    >
      {isEmpty && !successCode ? (
        <Alert severity="warning">
          Gio hang trong. Quay lai <Link to="/b/products">products</Link> de chon mon.
        </Alert>
      ) : successCode ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, border: '1px solid #f6d7e2', boxShadow: 'none' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 64, color: '#E91E63', mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            Dat hang thanh cong
          </Typography>
          <Typography sx={{ color: '#5f5f5f', mb: 3 }}>
            Ma don cua ban: <strong>{successCode}</strong>
          </Typography>
          <Button component={Link} to="/b/shop" variant="contained" sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#E91E63', '&:hover': { bgcolor: '#d81b60' } }}>
            Ve lai shop
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #f6d7e2', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
              Thong tin giao hang
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField fullWidth label="Ho va ten" value={formData.fullName} onChange={handleChange('fullName')} sx={{ mb: 2 }} />
            <TextField fullWidth label="So dien thoai" value={formData.phone} onChange={handleChange('phone')} sx={{ mb: 2 }} />
            <TextField fullWidth label="Dia chi" value={formData.address} onChange={handleChange('address')} sx={{ mb: 2 }} />
            <TextField fullWidth multiline minRows={3} label="Ghi chu" value={formData.note} onChange={handleChange('note')} />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #f6d7e2', boxShadow: 'none', height: 'fit-content' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>Don hang cua ban</Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: '#5f5f5f' }}>{item.name} x{item.quantity}</Typography>
                <Typography>{formatPrice(item.price * item.quantity)}</Typography>
              </Box>
            ))}

            <Box sx={{ borderTop: '1px solid #f6d7e2', mt: 2, pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Tam tinh</Typography>
                <Typography sx={{ fontWeight: 700 }}>{formatPrice(subtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography>Phi ship</Typography>
                <Typography sx={{ fontWeight: 700 }}>{formatPrice(shippingFee)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
                <Typography sx={{ fontWeight: 900 }}>Tong</Typography>
                <Typography sx={{ fontWeight: 900, color: '#E91E63' }}>{formatPrice(total)}</Typography>
              </Box>
            </Box>

            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              fullWidth
              sx={{ mt: 2.5, textTransform: 'none', fontWeight: 700, bgcolor: '#E91E63', '&:hover': { bgcolor: '#d81b60' } }}
            >
              Xac nhan dat hang
            </Button>
          </Paper>
        </Box>
      )}
    </BFlowLayout>
  )
}

