import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).populate('eventsRegistered');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

