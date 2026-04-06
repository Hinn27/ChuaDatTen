import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchBProducts, fetchBProductById } from '../services/bProductsRepository.js'

export function useBProducts(initialCategory = 'BunPho') {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [source, setSource] = useState('mock')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchBProducts()
      setProducts(result.products)
      setSource(result.source)
    } catch (loadError) {
      setError(loadError.message || 'Khong the tai danh sach mon an.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((item) => item.category).filter(Boolean)))
    return ['all', ...list]
  }, [products])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter((item) => item.category === selectedCategory)
  }, [products, selectedCategory])

  const getById = useCallback(
    async (id) => {
      const localMatch = products.find((item) => `${item.id}` === `${id}`)
      if (localMatch) {
        return { product: localMatch, source }
      }
      return fetchBProductById(id)
    },
    [products, source],
  )

  return {
    products,
    source,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    loadProducts,
    getById,
  }
}

