import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'

/**
 * Generic hook cho fetch data
 */
export function useFetch(url, options = {}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await api.get(url, options)
                setData(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (url) {
            fetchData()
        }
    }, [url])

    const refetch = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get(url, options)
            setData(response.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [url, options])

    return { data, loading, error, refetch }
}

/**
 * Generic hook cho mutation (POST, PUT, DELETE)
 */
export function useMutation(apiCall) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const mutate = useCallback(
        async (...args) => {
            try {
                setLoading(true)
                setError(null)
                const response = await apiCall(...args)
                return response.data
            } catch (err) {
                setError(err.message)
                throw err
            } finally {
                setLoading(false)
            }
        },
        [apiCall]
    )

    return { mutate, loading, error }
}
