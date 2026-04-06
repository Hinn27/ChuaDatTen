import { Alert, Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { BFlowLayout } from '../components/BFlowLayout.jsx'
import { BProductCard } from '../components/BProductCard.jsx'
import { useBProducts } from '../hooks/useBProducts.js'
import useCartStore from '../../../stores/useCartStore.js'

export default function BProductsPage() {
  const setActiveMember = useCartStore((state) => state.setActiveMember)
  const {
    loading,
    error,
    source,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useBProducts('BunPho')

  useEffect(() => {
    setActiveMember('b')
  }, [setActiveMember])

  return (
    <BFlowLayout
      title="BunPho Products"
      subtitle="Danh sach mon an cho member B, co bo loc category va them gio hang truc tiep."
      source={source}
    >
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category === 'all' ? 'Tat ca' : category}
            onClick={() => setSelectedCategory(category)}
            sx={{
              fontWeight: 700,
              mb: 1,
              bgcolor: selectedCategory === category ? '#E91E63' : '#fff',
              color: selectedCategory === category ? '#fff' : '#1a1a1a',
            }}
          />
        ))}
      </Stack>

      {source === 'mock' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Dang dung du lieu mau. Sau nay se doi sang backend PostgreSQL ma khong doi UI.
        </Alert>
      )}

      {loading ? (
        <Typography>Dang tai danh sach mon...</Typography>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filteredProducts.length ? (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <BProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ p: 3, border: '1px dashed #f5c4d6', borderRadius: 3 }}>
          Khong co mon nao trong category nay.
        </Box>
      )}
    </BFlowLayout>
  )
}

