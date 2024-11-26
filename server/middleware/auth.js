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

// Login route (typically where you'd authenticate and issue a JWT)
router.post('/login', authLimiter, (req, res) => {
  // Your login logic to authenticate the user, e.g., check user credentials
  const { username, password } = req.body;

  // Example: You would typically check the username and password in the database
  if (username === 'validUsername' && password === 'validPassword') {
    // Create a JWT token
    const token = jwt.sign({ userId: 'someUserId' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ message: 'Login successful', token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Export the router to use in your app
export default router;
