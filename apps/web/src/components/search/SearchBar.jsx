import { useState } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

/**
 * SearchBar — ô tìm kiếm ngữ nghĩa
 *
 * @param {Object} props
 * @param {Function} props.onSearch - (query) => void
 * @param {boolean} [props.loading]
 * @param {string} [props.placeholder]
 */
export function SearchBar({
  onSearch,
  loading = false,
  placeholder = 'Tìm kiếm món ăn...',
}) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 20px rgba(255,75,43,0.15)',
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  )
}
