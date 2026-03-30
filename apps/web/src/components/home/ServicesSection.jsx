import { Box, Container, Typography } from '@mui/material'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import DeckIcon from '@mui/icons-material/Deck'

/**
 * Dữ liệu services
 */
const SERVICES = [
  {
    icon: <LocalCafeIcon sx={{ fontSize: 36 }} />,
    title: 'Giải cứu buổi sáng',
    description: 'Mua đồ ăn sáng dư thừa từ các quán ăn với giá ưu đãi lên đến 50%.',
    color: '#FF9A2B',
  },
  {
    icon: <DeliveryDiningIcon sx={{ fontSize: 36 }} />,
    title: 'Giao hàng & Tự đến lấy',
    description: 'Hỗ trợ giao hàng tận nơi hoặc đến nhận trực tiếp tại quán.',
    color: '#FF4B2B',
  },
  {
    icon: <LocalBarIcon sx={{ fontSize: 36 }} />,
    title: 'Đồ uống & Cocktails',
    description: 'Nước ép, trà sữa, cà phê cuối ngày — tươi ngon giá hời.',
    color: '#8B5CF6',
  },
  {
    icon: <DeckIcon sx={{ fontSize: 36 }} />,
    title: 'Bữa ăn ngoài trời',
    description: 'Set ăn ngoài trời lý tưởng cho nhóm bạn bè, gia đình.',
    color: '#10B981',
  },
]

/**
 * Services Section — hiển thị 4 icon services
 * Theo layout Figma "We Provide Best Services"
 */
export function ServicesSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#FF4B2B',
            fontWeight: 700,
            letterSpacing: 2,
            mb: 1,
          }}
        >
          DỊCH VỤ TỐT NHẤT
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 1,
            color: '#1A1A2E',
          }}
        >
          Chúng tôi cung cấp
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: 'text.secondary', mb: 6, maxWidth: 500, mx: 'auto' }}
        >
          Giải cứu thức ăn thừa từ các nhà hàng uy tín, chất lượng đảm bảo.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {SERVICES.map((service) => (
            <Box
              key={service.title}
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: 4,
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  backgroundColor: `${service.color}08`,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  backgroundColor: `${service.color}12`,
                  color: service.color,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: service.color,
                    color: '#fff',
                    boxShadow: `0 6px 20px ${service.color}40`,
                  },
                }}
              >
                {service.icon}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#1A1A2E', mb: 1 }}
              >
                {service.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {service.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
