import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest.js';
import * as authController from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';  // Import the rate limiter correctly

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain uppercase, lowercase, number, and special character'),
    body('name').trim().notEmpty()
  ],
  validateRequest, // This will validate the request body
  authController.register // Ensure the controller method is correct
);

// Verify email
router.get('/verify/:token', authController.verifyEmail);

// Request Password Reset
router.post(
  '/password-reset-request',
  authLimiter,  // Apply rate limiter here
  [body('email').isEmail().normalizeEmail()],
  validateRequest,
  authController.requestPasswordReset
);

// Reset Password
router.post(
  '/password-reset/:token',
  [
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  ],
  validateRequest,
  authController.resetPassword
);

// Refresh Token
router.post('/refresh-token', authController.refreshToken);

export default router;
