import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Alert, Box, Button, Divider, IconButton, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { BFlowLayout } from '../components/BFlowLayout.jsx'
import useCartStore from '../../../stores/useCartStore.js'

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0)
}

export default function BCartPage() {
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  useEffect(() => {
    setActiveMember('b')
  }, [setActiveMember])

  const subtotal = getTotalPrice('b')

  return (
    <BFlowLayout title="Gio hang BunPho" subtitle="Trang cart full custom cho member B." source="mock">
      {items.length === 0 ? (
        <Alert severity="info">
          Gio hang dang trong. Ban co the quay lai <Link to="/b/products">products</Link> de chon mon.
        </Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 0.7fr' }, gap: 3 }}>
          <Box>
            {items.map((item) => (
              <Paper key={item.id} sx={{ p: 2, borderRadius: 3, mb: 2, border: '1px solid #f6d7e2', boxShadow: 'none' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '88px 1fr auto', gap: 2 }}>
                  <Box component="img" src={item.image} alt={item.name} sx={{ width: 88, height: 88, borderRadius: 2, objectFit: 'cover' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{item.name}</Typography>
                    <Typography sx={{ color: '#5f5f5f', mb: 1 }}>{formatPrice(item.price)}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button size="small" onClick={() => updateQuantity(item.id, item.quantity - 1, 'b')}>
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button size="small" onClick={() => updateQuantity(item.id, item.quantity + 1, 'b')}>
                        +
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 800, color: '#E91E63' }}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                    <IconButton color="error" onClick={() => removeItem(item.id, 'b')}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid #f6d7e2', boxShadow: 'none', height: 'fit-content' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5 }}>
              Tong ket
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tam tinh</Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatPrice(subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Phi ship</Typography>
              <Typography sx={{ fontWeight: 700 }}>{items.length ? formatPrice(15000) : '0d'}</Typography>
            </Box>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 800 }}>Tong cong</Typography>
              <Typography sx={{ fontWeight: 900, color: '#E91E63' }}>{formatPrice(subtotal + 15000)}</Typography>
            </Box>

            <Button
              component={Link}
              to="/b/checkout"
              variant="contained"
              fullWidth
              sx={{ textTransform: 'none', fontWeight: 700, bgcolor: '#E91E63', '&:hover': { bgcolor: '#d81b60' } }}
            >
              Tiep tuc checkout
            </Button>
          </Paper>
        </Box>
      )}
    </BFlowLayout>
  )
}

