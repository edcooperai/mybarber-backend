import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cors from 'cors';

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],       // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],         // Allowed headers
  credentials: true,                                         // Allow cookies and credentials
};

export const securityMiddleware = [
  // Set security headers
  helmet(),

  // Sanitize data
  mongoSanitize(),

  // Prevent XSS attacks
  xss(),

  // CORS Middleware
  cors(corsOptions),

  // Additional security headers
  (req, res, next) => {
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');

    // Enable strict transport security
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    next();
  },
];
