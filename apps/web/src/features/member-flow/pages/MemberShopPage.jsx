import { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { AppPageLayout } from '../../../components/common/AppPageLayout.jsx'
import { ProductList } from '../../../components/product/ProductList.jsx'
import { getMemberProfile } from '../../../shared/constants/memberProfiles.js'
import useCartStore from '../../../stores/useCartStore.js'
import useProductStore from '../../../stores/useProductStore.js'

/**
 * MemberShopPage - Trang landing theo member/category owner.
 */
export function MemberShopPage() {
  const navigate = useNavigate()
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
    <AppPageLayout>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 1 }}>
          Danh mục {profile.displayName} - member {profile.label.toLowerCase()}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Đây là landing cho member {profile.label.toLowerCase()}, đi theo flow list -> detail -> cart -> checkout.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Button onClick={() => navigate(`/${member}/products`)} variant="contained" sx={{ textTransform: 'none' }}>
            Xem danh sách món
          </Button>
          <Button onClick={() => navigate(`/${member}/cart`)} variant="outlined" sx={{ textTransform: 'none' }}>
            Xem giỏ hàng
          </Button>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Món nổi bật - {profile.displayName}
        </Typography>
        <ProductList products={featuredProducts} emptyMessage="Chưa có món nào để hiển thị." />
    </AppPageLayout>
  )
}
