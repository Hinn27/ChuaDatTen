import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import useCartStore from '../../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export function BProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      'b',
    )
  }

  return (
    <Card sx={{ borderRadius: 4, border: '1px solid #f3d5e1', boxShadow: 'none' }}>
      <CardMedia component="img" image={product.image} height="170" alt={product.name} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Chip label={product.category} size="small" sx={{ bgcolor: '#FFF8D8' }} />
          <Typography sx={{ fontWeight: 800, color: '#E91E63' }}>{formatPrice(product.price)}</Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.02rem', mb: 0.5 }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: '#5f5f5f', minHeight: 44, mb: 1.5 }}>{product.description}</Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to={`/b/products/${product.id}`}
            variant="outlined"
            sx={{ textTransform: 'none', borderColor: '#E91E63', color: '#E91E63', fontWeight: 700 }}
          >
            Chi tiet
          </Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#E91E63', '&:hover': { bgcolor: '#d81b60' } }}
          >
            Them
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

