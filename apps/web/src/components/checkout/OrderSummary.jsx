import { Box, Divider, Typography } from '@mui/material'
import useCartStore from '../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export function OrderSummary({ shippingFee = 15000 }) {
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const subtotal = getTotalPrice()
  const shipping = items.length ? shippingFee : 0
  const total = subtotal + shipping

  return (
    <Box sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'grey.200', backgroundColor: '#FAFAFA' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Tom tat don hang
      </Typography>

      {items.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.name} x{item.quantity}
          </Typography>
          <Typography variant="body2">{formatPrice(item.price * item.quantity)}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tam tinh</Typography>
        <Typography variant="body2">{formatPrice(subtotal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phi giao hang</Typography>
        <Typography variant="body2">{shipping ? formatPrice(shipping) : '0d'}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 700 }}>Tong cong</Typography>
        <Typography sx={{ fontWeight: 800, color: '#FF4B2B' }}>{formatPrice(total)}</Typography>
      </Box>
    </Box>
  )
}

