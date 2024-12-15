import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import morgan from 'morgan';
import connectDB from './config/database.js';
import { securityMiddleware } from './middleware/security.js';
import { authLimiter, apiLimiter, appointmentsLimiter, servicesLimiter, clientsLimiter, settingsLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import clientRoutes from './routes/clients.js';
import serviceRoutes from './routes/services.js';
import settingsRoutes from './routes/settings.js';

dotenv.config(); // Load .env variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // Frontend URL from .env
  credentials: true,
}));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(securityMiddleware); // Ensure this does not block /api/health

// Health check route (before rate limiting)
app.get('/api/health', (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); // Prevent caching of health check response
  res.status(200).json({
    status: 'success',
    message: 'API is healthy!',
    timestamp: new Date().toISOString(),
  });
});

// Rate Limiting
app.use('/api/auth', authLimiter);
app.use('/api/appointments', appointmentsLimiter);
app.use('/api/services', servicesLimiter);
app.use('/api/clients', clientsLimiter);
app.use('/api/settings', settingsLimiter);
app.use(apiLimiter); // Apply general rate limiting after specific limiters

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/settings', settingsRoutes);

// Catch-all for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Global Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
} catch (err) {
  logger.error('Server startup failed:', err);
  process.exit(1); // Exit process if server fails to start
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});
