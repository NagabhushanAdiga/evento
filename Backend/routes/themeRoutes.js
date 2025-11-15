import express from 'express';
import ThemeSettings from '../models/ThemeSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/theme
// @desc    Get theme settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await ThemeSettings.getSettings();
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/theme
// @desc    Update theme settings
// @access  Private (Admin only)
router.put('/', protect, async (req, res) => {
  try {
    let settings = await ThemeSettings.findOne();

    if (!settings) {
      settings = await ThemeSettings.create(req.body);
    } else {
      settings = await ThemeSettings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

