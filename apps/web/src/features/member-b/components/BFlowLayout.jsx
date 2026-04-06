import { Box, Button, Chip, Container, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/b/shop', label: 'Shop' },
  { to: '/b/products', label: 'Products' },
  { to: '/b/cart', label: 'Cart' },
  { to: '/b/checkout', label: 'Checkout' },
]

export function BFlowLayout({ title, subtitle, source, children, actions }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff7fa' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #f5c4d6',
          bgcolor: 'rgba(255,255,255,0.85)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            component={Link}
            to="/b/shop"
            sx={{ textDecoration: 'none', fontWeight: 900, color: '#1a1a1a', fontSize: '1.2rem' }}
          >
            F.A.T - BunPho B
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  '&.active': {
                    color: '#fff',
                    bgcolor: '#E91E63',
                    '&:hover': { bgcolor: '#d81b60' },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: '#fff',
            border: '1px solid #f6d7e2',
            boxShadow: '0 12px 28px rgba(233,30,99,0.08)',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a1a1a', mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: '#5f5f5f', mb: 2 }}>{subtitle}</Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              label="Member B - BunPho"
              sx={{ bgcolor: '#FFD60A', color: '#1a1a1a', fontWeight: 700 }}
            />
            <Chip
              label={source === 'api' ? 'Nguon: API PostgreSQL' : 'Nguon: Mock'}
              sx={{ bgcolor: '#FCE4EC', color: '#ad1457', fontWeight: 700 }}
            />
            {actions}
          </Box>
        </Box>

        {children}
      </Container>

      <Box sx={{ borderTop: '1px solid #f5c4d6', py: 3, mt: 4, bgcolor: '#fff' }}>
        <Container maxWidth="lg" sx={{ color: '#6a6a6a', fontSize: '0.9rem' }}>
          Flow B full custom - dong bo giao dien trang chu (pink/yellow).
        </Container>
      </Box>
    </Box>
  )
}

