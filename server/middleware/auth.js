import express from 'express';
import jwt from 'jsonwebtoken';
import { authLimiter } from '../middleware/rateLimiter.js'; // Correct import

const router = express.Router();

// Authentication middleware (JWT verification)
export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Apply the rate limiter to the login route
router.post('/login', authLimiter, auth, (req, res) => {
  // Your login logic here
  res.json({ message: 'Login successful' });
});

export default router;
