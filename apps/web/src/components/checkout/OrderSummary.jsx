import { Box, Typography, Divider } from '@mui/material'
import useCartStore from '../../stores/useCartStore.js'

/**
 * Format giá tiền VND
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/**
 * OrderSummary — hiển thị tóm tắt đơn hàng trong trang Checkout
 * Liệt kê sản phẩm + tổng tiền
 *
 * @param {Object} props
 * @param {number} [props.shippingFee]
 */
export function OrderSummary({ shippingFee = 15000 }) {
  const { items, getTotalPrice } = useCartStore()
  const subtotal = getTotalPrice()
  const total = subtotal + (items.length > 0 ? shippingFee : 0)

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: '#FAFAFA',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Đơn hàng của bạn
      </Typography>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              x{item.quantity}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, flexShrink: 0 }}>
            {formatPrice(item.price * item.quantity)}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tạm tính
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatPrice(subtotal)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Phí giao hàng
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {items.length > 0 ? formatPrice(shippingFee) : '—'}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Tổng cộng
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#FF4B2B' }}>
          {formatPrice(total)}
        </Typography>
      </Box>
    </Box>
  )
}
