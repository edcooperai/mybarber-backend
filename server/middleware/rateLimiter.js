import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

const createLimiter = (options) => {
  return rateLimit({
    ...options,
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for IP ${req.ip} on ${req.originalUrl}`);
      res.status(429).json({
        message: 'Too many requests, please try again later'
      });
    }
  });
};

export const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,  // Allow 5 requests per 15 minutes
  skipSuccessfulRequests: true, // Do not count successful requests
});

export const apiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,  // Allow 100 requests per 15 minutes
});

export const appointmentsLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 20,  // Allow 20 requests per minute
});

export const servicesLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30,  // Allow 30 requests per minute
});

export const clientsLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30,  // Allow 30 requests per minute
});

export const settingsLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 20,  // Allow 20 requests per minute
});
