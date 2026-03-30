import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

/**
 * Footer chung cho toàn bộ ứng dụng
 * Giữ nguyên theo thiết kế TasteNest Figma
 */
export function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A1A2E',
        color: '#ccc',
        pt: 8,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo & Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              🍽️ Refood
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', lineHeight: 1.8, mb: 1 }}>
              Thứ 3 – Thứ 7: 10:00am – 10:00pm
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Chủ nhật: Nghỉ
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              ⭐⭐⭐⭐⭐ Được đánh giá cao trên Refood
            </Typography>
          </Grid>

          {/* About */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
              Về chúng tôi
            </Typography>
            {['Giới thiệu', 'Món đặc biệt', 'Đặt hàng', 'Liên hệ'].map((item) => (
              <Typography
                key={item}
                component={Link}
                to="#"
                variant="body2"
                sx={{
                  display: 'block',
                  color: '#999',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: '#FF9A2B' },
                }}
              >
                › {item}
              </Typography>
            ))}
          </Grid>

          {/* Menu */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
              Thực đơn
            </Typography>
            {['Cơm', 'Bánh mì', 'Phở & Bún', 'Nước uống', 'Tráng miệng'].map((item) => (
              <Typography
                key={item}
                component={Link}
                to="#"
                variant="body2"
                sx={{
                  display: 'block',
                  color: '#999',
                  textDecoration: 'none',
                  mb: 1,
                  '&:hover': { color: '#FF9A2B' },
                }}
              >
                › {item}
              </Typography>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
              Đăng ký nhận tin
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
              Nhận tin tức và ưu đãi mới nhất.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Email của bạn"
                variant="outlined"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    borderRadius: 2,
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#FF9A2B' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#666' },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #FF4B2B, #FF9A2B)',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e0412a, #e88a25)',
                  },
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 3 }} />

        {/* Bottom */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: '#666' }}>
            © 2026 Refood. All rights reserved.
          </Typography>
          <Box>
            <IconButton size="small" sx={{ color: '#999', '&:hover': { color: '#1877F2' } }}>
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: '#999', '&:hover': { color: '#E4405F' } }}>
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
