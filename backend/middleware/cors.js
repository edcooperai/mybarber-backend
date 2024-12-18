import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://mybarber.ai',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

export const corsMiddleware = cors(corsOptions);