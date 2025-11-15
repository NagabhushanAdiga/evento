import express from 'express';
import ContactForm from '../models/ContactForm.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contact forms
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await ContactForm.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/contacts
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await ContactForm.create({
      name,
      email,
      phone: phone || '',
      message,
      status: 'new'
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contacts/:id/status
// @desc    Update contact form status
// @access  Private (Admin only)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact form
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await ContactForm.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact form not found' });
    }

    res.json({ message: 'Contact form deleted successfully', id: contact._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

