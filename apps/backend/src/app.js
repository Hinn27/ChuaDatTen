
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

// Import routes
import aiRoutes from './routes/ai.routes.js'
import authRoutes from './routes/auth.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'
import memberBRoutes from './routes/memberB.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import orderRoutes from './routes/order.routes.js'
import productRoutes from './routes/product.routes.js'
import semanticRoutes from './routes/semantic.routes.js'

// Import middleware
import { centralErrorHandler } from './middleware/error.middleware.js'

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() })
})

// API Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/chat', chatbotRoutes)
app.use('/api/v1/search', semanticRoutes)
app.use('/api/v1/ai', aiRoutes)
app.use('/api/v1/members/b', memberBRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    })
})

// Error handler (must be last)
app.use(centralErrorHandler)

export default app
