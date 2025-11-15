import express from 'express';
import Request from '../models/Request.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/requests
// @desc    Get all requests
// @access  Private (Admin only)
router.get('/', protect, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 }).populate('eventId');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/requests
// @desc    Create new request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;

    // Check if event exists and has capacity
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.registered >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Create request
    const request = await Request.create({
      eventId,
      eventTitle: event.title,
      userName: name,
      userEmail: email,
      userPhone: phone || '',
      status: 'pending'
    });

    // Add or update user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        phone: phone || '',
        eventsRegistered: [eventId]
      });
    } else {
      if (!user.eventsRegistered.includes(eventId)) {
        user.eventsRegistered.push(eventId);
        await user.save();
      }
    }

    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/requests/:id/status
// @desc    Update request status
// @access  Private (Admin only)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const oldStatus = request.status;
    request.status = status;
    await request.save();

    // Handle registration count changes
    const event = await Event.findById(request.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (status === 'approved' && oldStatus !== 'approved') {
      if (event.registered < event.capacity) {
        event.registered += 1;
        await event.save();
      }
    } else if (status === 'rejected' && oldStatus === 'approved') {
      if (event.registered > 0) {
        event.registered -= 1;
        await event.save();
      }
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/requests/:id
// @desc    Update request details
// @access  Private (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { date, numberOfGuests, location } = req.body;
    
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { date, numberOfGuests, location },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/requests/:id
// @desc    Delete request
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // If deleting an approved request, decrement event registration
    if (request.status === 'approved') {
      const event = await Event.findById(request.eventId);
      if (event && event.registered > 0) {
        event.registered -= 1;
        await event.save();
      }
    }

    await Request.findByIdAndDelete(req.params.id);

    res.json({ message: 'Request deleted successfully', id: request._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

