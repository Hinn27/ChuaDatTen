import { useNavigate } from 'react-router-dom'
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
import useCartStore from '../../stores/useCartStore.js'

/**
 * Format giá tiền VND
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

/**
 * ProductCard — card hiển thị sản phẩm (dùng ở HomePage, SearchPage, v.v.)
 *
 * @param {Object} props
 * @param {Object} props.product - { id, name, image, price, originalPrice, category, description }
 * @param {boolean} [props.showAddToCart] - Hiện nút thêm giỏ hàng
 */
export function ProductCard({ product, showAddToCart = true }) {
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

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
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'grey.200',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Discount badge */}
      {discount > 0 && (
        <Chip
          label={`-${discount}%`}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            fontWeight: 700,
            backgroundColor: '#FF4B2B',
            color: '#fff',
          }}
        />
      )}

      <CardMedia
        component="img"
        height={160}
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ p: 2 }}>
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 1,
              fontSize: '0.7rem',
              height: 22,
              backgroundColor: 'grey.100',
              color: 'text.secondary',
            }}
          />
        )}

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: '#1A1A2E',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </Typography>

        {product.description && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
              lineHeight: 1.4,
            }}
          >
            {product.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
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

          {showAddToCart && (
            <IconButton
              onClick={handleAddToCart}
              size="small"
              sx={{
                backgroundColor: '#FF4B2B',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e0412a',
                  boxShadow: '0 4px 12px rgba(255,75,43,0.4)',
                },
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
