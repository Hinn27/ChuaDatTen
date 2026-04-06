import { useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { ProductList } from '../components/product/ProductList.jsx'
import { getMemberProfile } from '../shared/constants/memberProfiles.js'
import useCartStore from '../stores/useCartStore.js'
import useProductStore from '../stores/useProductStore.js'

/**
 * MemberShopPage - Trang ban hang cho tung member.
 */
export function MemberShopPage() {
  const { member } = useParams()
  const profile = getMemberProfile(member)
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)

  useEffect(() => {
    setActiveMember(member)
    fetchProducts()
  }, [fetchProducts, member, setActiveMember])

  const featuredProducts = products
    .filter((product) => product.category === profile.defaultCategory)
    .slice(0, 4)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 1 }}>
          Shop - Member {profile.label}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Flow ban hang rieng cho {profile.displayName}.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Button component={Link} to={`/${member}/products`} variant="contained" sx={{ textTransform: 'none' }}>
            Den trang mat hang
          </Button>
          <Button component={Link} to={`/${member}/cart`} variant="outlined" sx={{ textTransform: 'none' }}>
            Xem gio hang
          </Button>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Mon noi bat - {profile.displayName}
        </Typography>
        <ProductList products={featuredProducts} emptyMessage="Chua co mon nao de hien thi." />
      </Container>
      <SiteFooter />
    </Box>
  )
}

