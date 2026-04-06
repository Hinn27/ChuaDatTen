import { useMutation, useQuery } from '@tanstack/react-query'
import { askChat, checkoutOrder, fetchProducts } from '../services/shopApi.js'

/**
 * Query lay danh sach san pham tu backend.
 * @param {Object} params
 */
export function useProductsQuery(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 60 * 1000,
  })
}

/**
 * Mutation dat hang.
 */
export function useCheckoutMutation() {
  return useMutation({
    mutationFn: checkoutOrder,
  })
}

/**
 * Mutation hoi AI chat.
 */
export function useChatMutation() {
  return useMutation({
    mutationFn: askChat,
  })
}
