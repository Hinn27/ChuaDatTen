import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WhatshotIcon from '@mui/icons-material/Whatshot'

/**
 * Mock data — sản phẩm bán chạy nhất
 * Sau này sẽ thay bằng API: GET /products/best-selling
 * Sắp xếp theo purchaseCountChange (mức tăng lượt mua)
 */
const MOCK_BEST_SELLING = [
  {
    id: 1,
    name: 'Cơm Tấm Sài Gòn',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80',
    price: 35000,
    originalPrice: 55000,
    category: 'Cơm',
    purchaseCount: 1240,
    purchaseCountChange: 320,
  },
  {
    id: 2,
    name: 'Phở Bò Tái Nạm',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80',
    price: 30000,
    originalPrice: 50000,
    category: 'Phở & Bún',
    purchaseCount: 980,
    purchaseCountChange: 280,
  },
  {
    id: 3,
    name: 'Bánh Mì Thịt Nướng',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80',
    price: 15000,
    originalPrice: 25000,
    category: 'Bánh mì',
    purchaseCount: 2100,
    purchaseCountChange: 250,
  },
  {
    id: 4,
    name: 'Bún Bò Huế',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
    price: 28000,
    originalPrice: 45000,
    category: 'Phở & Bún',
    purchaseCount: 870,
    purchaseCountChange: 190,
  },
  {
    id: 5,
    name: 'Gỏi Cuốn Tôm Thịt',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&q=80',
    price: 22000,
    originalPrice: 38000,
    category: 'Khai vị',
    purchaseCount: 650,
    purchaseCountChange: 170,
  },
  {
    id: 6,
    name: 'Trà Sữa Trân Châu',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400&q=80',
    price: 18000,
    originalPrice: 35000,
    category: 'Nước uống',
    purchaseCount: 1560,
    purchaseCountChange: 150,
  },
]

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
 * Tính % giảm giá
 * @param {number} original
 * @param {number} current
 * @returns {number}
 */
function calcDiscount(original, current) {
  return Math.round(((original - current) / original) * 100)
}

/**
 * BestSellingItems — Hiển thị sản phẩm bán chạy nhất
 * THAY THẾ "Deal of the Week" + "Private Dining" từ thiết kế gốc
 *
 * Logic: sắp xếp theo purchaseCountChange giảm dần
 * Top 3 sẽ có badge 🔥 Hot
 *
 * @param {Object} props
 * @param {Array} [props.items] - Danh sách sản phẩm từ API. Nếu không truyền, dùng mock data.
 * @param {boolean} [props.loading] - Trạng thái loading
 */
export function BestSellingItems({ items = null, loading = false }) {
  const [displayItems, setDisplayItems] = useState([])

  useEffect(() => {
    // Dùng data từ props nếu có, nếu không dùng mock
    const data = items || MOCK_BEST_SELLING
    // Sắp xếp theo purchaseCountChange giảm dần
    const sorted = [...data].sort(
      (a, b) => (b.purchaseCountChange || 0) - (a.purchaseCountChange || 0)
    )
    setDisplayItems(sorted)
  }, [items])

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<WhatshotIcon />}
            label="HOT"
            size="small"
            sx={{
              mb: 2,
              fontWeight: 700,
              backgroundColor: '#FF4B2B',
              color: '#fff',
              '& .MuiChip-icon': { color: '#fff' },
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1A1A2E',
              mb: 1,
            }}
          >
            Món Bán Chạy Nhất
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
            Được cập nhật tự động theo lượt mua tăng cao nhất
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  height={320}
                  sx={{ borderRadius: 4 }}
                />
              ))
            : displayItems.map((item, index) => (
                <Card
                  key={item.id}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: index < 3 ? 'rgba(255,75,43,0.2)' : 'grey.200',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  {/* Discount badge */}
                  {item.originalPrice && (
                    <Chip
                      label={`-${calcDiscount(item.originalPrice, item.price)}%`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 2,
                        fontWeight: 700,
                        backgroundColor: '#FF4B2B',
                        color: '#fff',
                        fontSize: '0.75rem',
                      }}
                    />
                  )}

                  {/* Hot badge (Top 3) */}
                  {index < 3 && (
                    <Chip
                      icon={<WhatshotIcon sx={{ fontSize: 14 }} />}
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        fontWeight: 700,
                        backgroundColor: '#FFF3E0',
                        color: '#FF9A2B',
                        '& .MuiChip-icon': { color: '#FF9A2B' },
                      }}
                    />
                  )}

                  <CardMedia
                    component="img"
                    height={180}
                    image={item.image}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />

                  <CardContent sx={{ p: 2.5 }}>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        mb: 1,
                        fontSize: '0.7rem',
                        height: 22,
                        backgroundColor: 'grey.100',
                        color: 'text.secondary',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: '#1A1A2E', mb: 1, lineHeight: 1.3 }}
                    >
                      {item.name}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1.5 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, color: '#FF4B2B' }}
                      >
                        {formatPrice(item.price)}
                      </Typography>
                      {item.originalPrice && (
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.disabled',
                          }}
                        >
                          {formatPrice(item.originalPrice)}
                        </Typography>
                      )}
                    </Box>

                    {/* Purchase trend */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: '#10B981',
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        +{item.purchaseCountChange} lượt mua tuần này
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
        </Box>
      </Container>
    </Box>
  )
}
