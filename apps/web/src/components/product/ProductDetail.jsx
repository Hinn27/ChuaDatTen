import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useParams } from 'react-router-dom'
import useCartStore from '../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export function ProductDetail({ product }) {
  const { member } = useParams()
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    return <Typography color="text.secondary">Khong tim thay san pham.</Typography>
  }

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: 'grey.200' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <Box component="img" src={product.image} alt={product.name} sx={{ width: '100%', borderRadius: 3 }} />

        <Box>
          <Chip label={product.category || 'Khac'} size="small" sx={{ mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>{product.description}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#FF4B2B', mb: 2 }}>
            {formatPrice(product.price)}
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() =>
              addItem(
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                },
                member,
              )
            }
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            Them vao gio hang
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

