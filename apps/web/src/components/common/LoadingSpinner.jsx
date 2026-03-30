import { Box, CircularProgress, Typography } from '@mui/material'

/**
 * Spinner loading toàn trang hoặc inline
 * @param {Object} props
 * @param {string} [props.message] - Text hiển thị bên dưới spinner
 * @param {boolean} [props.fullPage] - true = chiếm toàn bộ viewport
 */
export function LoadingSpinner({ message = 'Đang tải...', fullPage = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: fullPage ? 0 : 6,
        ...(fullPage && {
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(6px)',
        }),
      }}
    >
      <CircularProgress
        size={40}
        sx={{
          color: '#FF4B2B',
        }}
      />
      {message && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
