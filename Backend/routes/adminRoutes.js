import express from 'express';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admins
// @desc    Get all admins
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admins
// @desc    Create new admin
// @access  Private (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username or email already exists' });
    }

    const admin = await Admin.create({
      username,
      email,
      password
    });

    res.status(201).json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admins/:id
// @desc    Delete admin
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    // Prevent deleting yourself
    if (req.admin._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully', id: admin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

