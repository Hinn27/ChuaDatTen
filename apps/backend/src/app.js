
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';
import orderRoutes from './routes/order.routes.js';
import productRoutes from './routes/product.routes.js';
import semanticRoutes from './routes/semantic.routes.js';
import { askChatbot } from './controllers/chatbot.controller.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/semantic', semanticRoutes);

app.use('/api/chatbot', chatbotRoutes);
app.post('/api/chat', askChatbot);

// Error handler
app.use(errorHandler);

export default app;
