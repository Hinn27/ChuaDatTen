import { useCallback, useState } from 'react'
import api from '../services/api'

/**
 * Custom hook cho đơn hàng
 */
export function useOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchOrders = useCallback(async (status = null) => {
        try {
            setLoading(true)
            const params = status ? { status } : {}
            const response = await api.get('/orders', { params })
            setOrders(response.data.data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    return { orders, loading, error, fetchOrders }
}

/**
 * Custom hook cho chi tiết đơn hàng
 */
export function useOrderDetail() {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchOrderDetail = useCallback(async (orderId) => {
        try {
            setLoading(true)
            const response = await api.get(`/orders/${orderId}`)
            setOrder(response.data.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    return { order, loading, error, fetchOrderDetail }
}

/**
 * Custom hook cho checkout
 */
export function useCheckout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const checkout = useCallback(async (orderData) => {
        try {
            setLoading(true)
            const response = await api.post('/orders/checkout', orderData)
            return response.data.data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return { checkout, loading, error }
}
