import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

/**
 * Component hiển thị lỗi chung
 * @param {Object} props
 * @param {string} [props.message] - Nội dung lỗi
 * @param {Function} [props.onRetry] - Callback khi bấm "Thử lại"
 */
export function ErrorMessage({ message = 'Đã có lỗi xảy ra.', onRetry = null }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 6,
        px: 3,
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, color: '#FF4B2B' }} />
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          size="small"
          onClick={onRetry}
          sx={{
            textTransform: 'none',
            borderColor: '#FF4B2B',
            color: '#FF4B2B',
            '&:hover': {
              borderColor: '#e0412a',
              backgroundColor: 'rgba(255,75,43,0.06)',
            },
          }}
        >
          Thử lại
        </Button>
      )}
    </Box>
  )
}
