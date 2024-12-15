import express from 'express';
import jwt from 'jsonwebtoken';
import { authLimiter } from '../middleware/rateLimiter.js'; // Correct import for authLimiter

const router = express.Router();

// Authentication middleware (JWT verification)
export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach the user ID to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Login route (authentication and JWT issuance)
router.post('/login', authLimiter, (req, res) => {
  const { username, password } = req.body;

  // Replace this with actual authentication logic
  if (username === 'validUsername' && password === 'validPassword') {
    const token = jwt.sign({ userId: 'someUserId' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ message: 'Login successful', token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
