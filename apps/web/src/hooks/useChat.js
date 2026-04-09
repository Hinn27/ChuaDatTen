import { useCallback, useEffect, useState } from 'react'
import api from '../services/api'

/**
 * Custom hook cho chat
 */
export function useChat() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendMessage = useCallback(async (message) => {
        try {
            setLoading(true)
            const response = await api.post('/chat', { message })
            const { response: aiResponse, relatedProducts } = response.data.data

            setMessages((prev) => [
                ...prev,
                { role: 'user', message },
                { role: 'ai', message: aiResponse, relatedProducts },
            ])
            return aiResponse
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchChatHistory = useCallback(async (page = 1) => {
        try {
            setLoading(true)
            const response = await api.get('/chat/history', { params: { page } })
            setMessages(response.data.data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const clearMessages = useCallback(() => {
        setMessages([])
    }, [])

    return {
        messages,
        loading,
        error,
        sendMessage,
        fetchChatHistory,
        clearMessages,
    }
}

/**
 * Custom hook cho gợi ý câu hỏi
 */
export function useSuggestedQuestions() {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true)
                const response = await api.get('/chat/suggested-questions')
                setQuestions(response.data.data || [])
            } catch (err) {
                console.error('Error fetching suggested questions:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    return { questions, loading }
}
