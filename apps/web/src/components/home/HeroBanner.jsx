import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material'

/**
 * Hero Banner — phần đầu trang chủ
 * Hiển thị tiêu đề lớn + 2 nút Đăng Nhập / Đăng Ký
 * (Bỏ các ô input Date/Time/Guest theo yêu cầu)
 */
export function HeroBanner() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 420, md: 520 },
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0E0 50%, #FFE8D0 100%)',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,75,43,0.08)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,154,43,0.1)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Copy */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3.2rem' },
                lineHeight: 1.15,
                mb: 1,
                color: '#1A1A2E',
              }}
            >
              Giải cứu thức ăn,
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tiết kiệm cho bạn
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 440,
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.6,
              }}
            >
              Mua thức ăn thừa từ các nhà hàng uy tín với giá ưu đãi.
              Giúp giảm lãng phí — Giúp bạn tiết kiệm.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/auth?mode=login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                  boxShadow: '0 4px 16px rgba(255,75,43,0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                    boxShadow: '0 6px 20px rgba(255,75,43,0.45)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Đăng Nhập
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/auth?mode=register')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: '#FF4B2B',
                  color: '#FF4B2B',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#e0412a',
                    backgroundColor: 'rgba(255,75,43,0.06)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Đăng Ký
              </Button>
            </Stack>
          </Box>

          {/* Hero images */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: 160, md: 220 },
                height: { xs: 240, md: 320 },
                borderRadius: '60px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                transform: 'rotate(-3deg)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(0deg) scale(1.02)' },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=440&q=80"
                alt="Món ăn ngon"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: 140, md: 190 },
                height: { xs: 200, md: 270 },
                borderRadius: '50px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                transform: 'rotate(4deg) translateY(30px)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(0deg) translateY(30px) scale(1.02)' },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=440&q=80"
                alt="Thức ăn tươi"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Delivery badge */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 40 },
          right: { xs: 16, md: 60 },
          backgroundColor: '#fff',
          borderRadius: 4,
          px: 2.5,
          py: 1.5,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
          zIndex: 2,
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
          },
        }}
      >
        <Typography sx={{ fontSize: '1.5rem' }}>🛵</Typography>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#1A1A2E', display: 'block' }}>
            Giao hàng nhanh
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            7 ngày/tuần
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
