import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Alert, Box, Button, Chip, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BFlowLayout } from '../components/BFlowLayout.jsx'
import { useBProducts } from '../hooks/useBProducts.js'
import useCartStore from '../../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export default function BProductDetailPage() {
  const { id } = useParams()
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const addItem = useCartStore((state) => state.addItem)
  const { getById, source } = useBProducts('BunPho')
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setActiveMember('b')
  }, [setActiveMember])

  useEffect(() => {
    let mounted = true
    const loadDetail = async () => {
      setLoading(true)
      const result = await getById(id)
      if (mounted) {
        setProduct(result.product)
        setLoading(false)
      }
    }
    loadDetail()
    return () => {
      mounted = false
    }
  }, [getById, id])

  const handleAdd = () => {
    if (!product) return
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
    <BFlowLayout
      title="Chi tiet mon BunPho"
      subtitle="Trang chi tiet /b/products/:id cho flow B."
      source={source}
    >
      {loading ? (
        <Typography>Dang tai chi tiet mon...</Typography>
      ) : !product ? (
        <Alert severity="warning">Khong tim thay mon an.</Alert>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #f6d7e2', boxShadow: 'none' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box component="img" src={product.image} alt={product.name} sx={{ width: '100%', borderRadius: 3 }} />

            <Box>
              <Chip label={product.category} sx={{ bgcolor: '#FFF8D8', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                {product.name}
              </Typography>
              <Typography sx={{ color: '#5f5f5f', mb: 2 }}>{product.description}</Typography>
              <Typography variant="h5" sx={{ color: '#E91E63', fontWeight: 900, mb: 2 }}>
                {formatPrice(product.price)}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAdd}
                  sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#E91E63', '&:hover': { bgcolor: '#d81b60' } }}
                >
                  Them vao gio
                </Button>
                <Button
                  component={Link}
                  to="/b/cart"
                  variant="outlined"
                  sx={{ textTransform: 'none', fontWeight: 700, borderColor: '#E91E63', color: '#E91E63' }}
                >
                  Di toi cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </BFlowLayout>
  )
}

