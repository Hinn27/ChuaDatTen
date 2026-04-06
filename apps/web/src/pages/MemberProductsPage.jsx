import { useEffect } from 'react'
import { Alert, Box, Chip, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx'
import { ProductList } from '../components/product/ProductList.jsx'
import { getMemberProfile } from '../shared/constants/memberProfiles.js'
import useCartStore from '../stores/useCartStore.js'
import useProductStore from '../stores/useProductStore.js'

/**
 * MemberProductsPage - Trang mat hang voi bo loc category.
 */
export function MemberProductsPage() {
  const { member } = useParams()
  const profile = getMemberProfile(member)
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const {
    loading,
    error,
    selectedCategory,
    usingMockData,
    fetchProducts,
    setCategory,
    getCategories,
    getFilteredProducts,
  } = useProductStore()

  useEffect(() => {
    setActiveMember(member)
    fetchProducts()
    setCategory(profile.defaultCategory)
  }, [fetchProducts, member, profile.defaultCategory, setActiveMember, setCategory])

  const categories = getCategories()
  const products = getFilteredProducts()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 1 }}>
          Products - {profile.displayName}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Member {profile.label} uu tien category {profile.defaultCategory}.
        </Typography>

        {usingMockData && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Dang dung mock products de demo vi backend product API chua san sang.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category === 'all' ? 'Tat ca' : category}
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setCategory(category)}
            />
          ))}
        </Box>

        {loading ? (
          <LoadingSpinner message="Dang tai danh sach mon an..." />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <ProductList products={products} emptyMessage="Khong co mon an trong category nay." />
        )}
      </Container>
      <SiteFooter />
    </Box>
  )
}

