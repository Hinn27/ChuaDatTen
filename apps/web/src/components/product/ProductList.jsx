import { Box, Typography, Skeleton } from '@mui/material'
import { ProductCard } from './ProductCard.jsx'

/**
 * ProductList — hiển thị danh sách sản phẩm dạng grid
 *
 * @param {Object} props
 * @param {Array} props.products - Danh sách sản phẩm
 * @param {boolean} [props.loading] - Đang tải
 * @param {string} [props.emptyMessage] - Message khi rỗng
 * @param {number} [props.columns] - Số cột (mặc định 3)
 */
export function ProductList({
  products = [],
  loading = false,
  emptyMessage = 'Không tìm thấy sản phẩm nào.',
  columns = 3,
}) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: `repeat(${columns}, 1fr)`,
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={280} sx={{ borderRadius: 4 }} />
        ))}
      </Box>
    )
  }

  if (!products.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
          🍽️
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {emptyMessage}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          md: `repeat(${columns}, 1fr)`,
        },
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  )
}
