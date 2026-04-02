import { Box, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import useCartStore from '../../stores/useCartStore.js'

/**
 * Format giá tiền VND
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/**
 * CartItem — mỗi item trong giỏ hàng
 *
 * @param {Object} props
 * @param {Object} props.item - { id, name, image, price, quantity }
 */
export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'grey.100',
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 64,
          height: 64,
          borderRadius: 2,
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#FF4B2B', fontWeight: 700 }}>
          {formatPrice(item.price)}
        </Typography>

        {/* Quantity controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            sx={{
              width: 26,
              height: 26,
              border: '1px solid',
              borderColor: 'grey.300',
            }}
          >
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            sx={{
              width: 26,
              height: 26,
              border: '1px solid',
              borderColor: 'grey.300',
            }}
          >
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Subtotal + Delete */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1A1A2E' }}>
          {formatPrice(item.price * item.quantity)}
        </Typography>
        <IconButton
          size="small"
          onClick={() => removeItem(item.id)}
          sx={{ color: 'text.disabled', '&:hover': { color: '#FF4B2B' } }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  )
}
