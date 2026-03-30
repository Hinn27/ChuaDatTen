import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { SimilarityBadge } from './SimilarityBadge.jsx'
import useCartStore from '../../stores/useCartStore.js'

/**
 * Format giá tiền VND
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

/**
 * SearchResultCard — card kết quả tìm kiếm ngữ nghĩa
 * Hiển thị sản phẩm + điểm Cosine Similarity
 *
 * @param {Object} props
 * @param {Object} props.product - Sản phẩm kèm similarityScore
 */
export function SearchResultCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'grey.200',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: 100, sm: 140 },
          height: { xs: 100, sm: 140 },
          objectFit: 'cover',
          flexShrink: 0,
        }}
        image={product.image}
        alt={product.name}
      />

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 2,
          px: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {product.category && (
            <Chip
              label={product.category}
              size="small"
              sx={{
                fontSize: '0.65rem',
                height: 20,
                backgroundColor: 'grey.100',
                color: 'text.secondary',
              }}
            />
          )}
          {product.similarityScore != null && (
            <SimilarityBadge score={product.similarityScore} />
          )}
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1A2E', mb: 0.5 }}>
          {product.name}
        </Typography>

        {product.description && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
            }}
          >
            {product.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FF4B2B' }}>
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="caption"
                sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>

          <IconButton
            onClick={handleAddToCart}
            size="small"
            sx={{
              backgroundColor: '#FF4B2B',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e0412a',
              },
            }}
          >
            <AddShoppingCartIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
