import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Badge,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../../stores/useCartStore.js'
import { CartItem } from './CartItem.jsx'

/**
 * Format giá tiền VND
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/**
 * CartDrawer — slide-in drawer hiển thị giỏ hàng
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.onClose
 */
export function CartDrawer({ open, onClose }) {
  const navigate = useNavigate()
  const { items, clearCart, getTotalPrice, getTotalItems } = useCartStore()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, display: 'flex', flexDirection: 'column' },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Giỏ hàng
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Items */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: '3rem', mb: 2 }}>🛒</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Giỏ hàng trống
            </Typography>
          </Box>
        ) : (
          items.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tổng ({totalItems} sản phẩm)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FF4B2B' }}>
              {formatPrice(totalPrice)}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckout}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
              mb: 1,
              '&:hover': {
                background: 'linear-gradient(135deg, #e0412a, #e88a25)',
              },
            }}
          >
            Thanh toán
          </Button>

          <Button
            fullWidth
            variant="text"
            size="small"
            onClick={clearCart}
            sx={{
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': { color: '#FF4B2B' },
            }}
          >
            Xóa giỏ hàng
          </Button>
        </Box>
      )}
    </Drawer>
  )
}
