import { useEffect } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx'
import { ProductDetail } from '../components/product/ProductDetail.jsx'
import { getMemberProfile } from '../shared/constants/memberProfiles.js'
import useCartStore from '../stores/useCartStore.js'
import useProductStore from '../stores/useProductStore.js'

/**
 * MemberProductDetailPage - Trang chi tiet mon an theo id.
 */
export function MemberProductDetailPage() {
  const { member, id } = useParams()
  const profile = getMemberProfile(member)
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const { selectedProduct, loading, error, fetchProductById } = useProductStore()

  useEffect(() => {
    setActiveMember(member)
    fetchProductById(id)
  }, [fetchProductById, id, member, setActiveMember])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 2 }}>
          Product Detail - Member {profile.label} ({profile.displayName})
        </Typography>

        {loading ? (
          <LoadingSpinner message="Dang tai chi tiet mon an..." />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <ProductDetail product={selectedProduct} />
        )}
      </Container>
      <SiteFooter />
    </Box>
  )
}

