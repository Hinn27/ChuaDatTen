import { Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { BFlowLayout } from '../components/BFlowLayout.jsx'
import { BProductCard } from '../components/BProductCard.jsx'
import { useBProducts } from '../hooks/useBProducts.js'
import useCartStore from '../../../stores/useCartStore.js'

export default function BShopPage() {
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const { filteredProducts, loading, source } = useBProducts('BunPho')

  useEffect(() => {
    setActiveMember('b')
  }, [setActiveMember])

  return (
    <BFlowLayout
      title="BunPho Shop"
      subtitle="Trang ban hang rieng cho member B. Dong bo style pink/yellow tu trang chu."
      source={source}
      actions={
        <>
          <Button component={Link} to="/b/products" sx={{ textTransform: 'none', fontWeight: 700 }}>
            Xem toan bo mon
          </Button>
          <Button component={Link} to="/b/cart" sx={{ textTransform: 'none', fontWeight: 700 }}>
            Di den gio hang
          </Button>
        </>
      }
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 3,
          background: 'linear-gradient(130deg, #E91E63 0%, #FFD60A 100%)',
          color: '#1a1a1a',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.7 }}>
          Signature BunPho Combo
        </Typography>
        <Typography sx={{ fontWeight: 600 }}>
          Dat nhanh bo BunPho + do uong de demo full flow /b/shop -> /b/checkout.
        </Typography>
      </Box>

      {loading ? (
        <Typography>Dang tai mon an...</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.slice(0, 4).map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <BProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </BFlowLayout>
  )
}

