import { Box, IconButton, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import useCartStore from '../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: 2,
        p: 2,
        mb: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
      }}
    >
      <Box component="img" src={item.image} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover' }} />

      <Box>
        <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {formatPrice(item.price)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontWeight: 700, color: '#FF4B2B' }}>{formatPrice(item.price * item.quantity)}</Typography>
        <IconButton color="error" size="small" onClick={() => removeItem(item.id)}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

