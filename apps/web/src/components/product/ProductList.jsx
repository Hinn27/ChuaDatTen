import { Box, Typography } from '@mui/material'
import { ProductCard } from './ProductCard.jsx'

export function ProductList({ products = [], emptyMessage = 'Chua co san pham.' }) {
  if (!products.length) {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {emptyMessage}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
        gap: 2,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  )
}

