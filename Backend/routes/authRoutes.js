import express from 'express';
import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // For development bypass - if username is empty or not provided, allow login
    if (!username || !password) {
      // Create or find default admin
      let admin = await Admin.findOne({ username: 'admin' });
      
      if (!admin) {
        admin = await Admin.create({
          username: 'admin',
          email: 'admin@eventpro.com',
          password: 'admin123'
        });
      }

      const token = generateToken(admin._id);

      return res.json({
        success: true,
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

