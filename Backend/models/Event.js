import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  registered: {
    type: Number,
    default: 0,
    min: 0
  },
  capacity: {
    type: Number,
    default: 100,
    min: 1
  },
  date: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  organizer: {
    type: String,
    default: 'EventPro Planning'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;

