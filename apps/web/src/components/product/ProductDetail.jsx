import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
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
 * ProductDetail — hiển thị chi tiết sản phẩm
 * Hình ảnh lớn, tên, mô tả, giá, nút +/- số lượng, nút "Thêm vào giỏ"
 *
 * @param {Object} props
 * @param {Object} props.product - Chi tiết sản phẩm
 */
export function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 6 },
      }}
    >
      {/* Image */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {discount > 0 && (
          <Chip
            label={`Giảm ${discount}%`}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 2,
              fontWeight: 700,
              backgroundColor: '#FF4B2B',
              color: '#fff',
            }}
          />
        )}
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            maxHeight: 480,
            objectFit: 'cover',
            borderRadius: 4,
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ flex: 1 }}>
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 2,
              backgroundColor: '#FFF3E0',
              color: '#FF9A2B',
              fontWeight: 600,
            }}
          />
        )}

        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A2E', mb: 2 }}>
          {product.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}
        >
          {product.description || 'Chưa có mô tả cho sản phẩm này.'}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FF4B2B' }}>
            {formatPrice(product.price)}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="h6"
              sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
            >
              {formatPrice(product.originalPrice)}
            </Typography>
          )}
        </Box>

        {/* Quantity */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Số lượng:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
              sx={{
                px: 2,
                minWidth: 40,
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Add to Cart button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            px: 5,
            py: 1.5,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
            boxShadow: '0 4px 16px rgba(255,75,43,0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e0412a, #e88a25)',
              boxShadow: '0 6px 20px rgba(255,75,43,0.45)',
            },
          }}
        >
          Thêm vào giỏ — {formatPrice(product.price * quantity)}
        </Button>
      </Box>
    </Box>
  )
}
