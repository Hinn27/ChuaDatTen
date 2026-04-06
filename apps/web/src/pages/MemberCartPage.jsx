import { useEffect } from 'react'
import { Alert, Box, Button, Container, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/common/SiteFooter.jsx'
import { SiteHeader } from '../components/common/SiteHeader.jsx'
import { CartItem } from '../components/cart/CartItem.jsx'
import { CartSummary } from '../components/cart/CartSummary.jsx'
import { getMemberProfile } from '../shared/constants/memberProfiles.js'
import useCartStore from '../stores/useCartStore.js'

/**
 * MemberCartPage - Trang gio hang theo member route.
 */
export function MemberCartPage() {
  const { member } = useParams()
  const profile = getMemberProfile(member)
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    setActiveMember(member)
  }, [member, setActiveMember])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <Container maxWidth="lg" sx={{ py: 5, flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 2 }}>
          Cart - Member {profile.label} ({profile.displayName})
        </Typography>

        {items.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            Gio hang dang trong.
          </Alert>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 4 }}>
            <Box>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>
            <CartSummary />
          </Box>
        )}

        <Button component={Link} to={`/${member}/products`} variant="text" sx={{ mt: 2, textTransform: 'none' }}>
          ← Quay lai trang mat hang
        </Button>
      </Container>
      <SiteFooter />
    </Box>
  )
}

