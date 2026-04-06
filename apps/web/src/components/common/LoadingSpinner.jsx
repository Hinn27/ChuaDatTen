import { Box, CircularProgress, Typography } from '@mui/material'

export function LoadingSpinner({ message = 'Dang tai du lieu...' }) {
  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {message}
      </Typography>
    </Box>
  )
}

