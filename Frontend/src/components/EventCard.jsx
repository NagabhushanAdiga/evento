import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaUsers, FaArrowRight } from 'react-icons/fa';

const EventCard = memo(({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const availableSpots = event.capacity - event.registered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-2">
            {event.title}
          </h3>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            {event.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{event.description}</p>
        <div className="space-y-2 mb-4">
          {event.date && event.time && (
            <div className="flex items-center text-gray-600 text-sm">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" />
              <span>{formatDate(event.date)} at {event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center text-gray-600 text-sm">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          <div className="flex items-center text-gray-600 text-sm">
            <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-semibold">${event.price.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <FaUsers className="w-4 h-4 mr-1" />
            <span>{event.registered}/{event.capacity}</span>
          </div>
          <div className={`text-sm font-semibold px-2 py-1 rounded ${
            availableSpots > 10 ? 'text-green-600 bg-green-100' : 
            availableSpots > 0 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'
          }`}>
            {availableSpots > 0 ? `${availableSpots} spots left` : 'Sold Out'}
          </div>
        </div>
        <Link
          to={`/events/${event.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          View Details
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;