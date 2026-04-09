import { Button, Container, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Not Found Page
 * 404 error page
 */
export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ mb: 2, fontWeight: 'bold', color: 'error.main' }}>
          404
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Trang không tìm thấy
        </Typography>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Đường dẫn bạn tìm kiếm không tồn tại. Vui lòng quay lại trang chủ.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Trang Chủ
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Quay Lại
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
