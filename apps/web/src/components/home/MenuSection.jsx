import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material'

/**
 * Mock data cho menu (Breakfast, Lunch, Dinner)
 * Sẽ được thay bằng API data sau
 */
const MENU_DATA = {
  Breakfast: [
    { name: 'Bánh Mì Ốp La', price: 25000, description: 'Bánh mì giòn, trứng ốp la, đồ chua' },
    { name: 'Xôi Mặn', price: 20000, description: 'Xôi dẻo, hành phi, chả lụa, trứng muối' },
    { name: 'Phở Bò', price: 45000, description: 'Phở bò truyền thống, nước dùng hầm xương' },
  ],
  Lunch: [
    { name: 'Cơm Tấm Sườn', price: 40000, description: 'Sườn nướng, bì, chả, trứng ốp la' },
    { name: 'Bún Chả Hà Nội', price: 35000, description: 'Chả viên, chả miếng, bún, rau sống' },
    { name: 'Cá Kho Tộ', price: 50000, description: 'Cá lóc kho tộ, canh chua, cơm trắng' },
  ],
  Dinner: [
    { name: 'Lẩu Thái', price: 120000, description: 'Lẩu hải sản chua cay kiểu Thái' },
    { name: 'Gà Nướng Mật Ong', price: 85000, description: 'Gà ta nướng mật ong, kèm rau xanh' },
    { name: 'Bò Lúc Lắc', price: 95000, description: 'Thịt bò Úc xào với rau củ, nước sốt đặc biệt' },
  ],
}

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
 * Menu Section — hiển thị thực đơn Breakfast / Lunch / Dinner
 * Theo layout Figma với 3 cột card
 */
export function MenuSection() {
  const mealColors = {
    Breakfast: '#FF9A2B',
    Lunch: '#FF4B2B',
    Dinner: '#8B5CF6',
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FAFAFA' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 1,
            color: '#1A1A2E',
          }}
        >
          Thực Đơn Hấp Dẫn
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}
        >
          Chọn bữa ăn phù hợp với bạn
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {Object.entries(MENU_DATA).map(([mealType, items]) => (
            <Card
              key={mealType}
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Chip
                  label={mealType === 'Breakfast' ? 'Bữa Sáng' : mealType === 'Lunch' ? 'Bữa Trưa' : 'Bữa Tối'}
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    backgroundColor: `${mealColors[mealType]}15`,
                    color: mealColors[mealType],
                    borderRadius: 2,
                  }}
                />
                {items.map((item, idx) => (
                  <Box
                    key={item.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      py: 2,
                      borderBottom: idx < items.length - 1 ? '1px dashed' : 'none',
                      borderColor: 'grey.200',
                    }}
                  >
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: '#1A1A2E', mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                        {item.description}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: mealColors[mealType],
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatPrice(item.price)}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
