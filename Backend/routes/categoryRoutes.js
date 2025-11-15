import express from 'express';
import Category from '../models/Category.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const categoryNames = categories.map(cat => cat.name);
    res.json(categoryNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ 
      name: name.trim() 
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name: name.trim() });
    res.status(201).json(category.name);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/categories/:name
// @desc    Delete category
// @access  Private (Admin only)
router.delete('/:name', protect, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ name: req.params.name });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully', name: category.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

