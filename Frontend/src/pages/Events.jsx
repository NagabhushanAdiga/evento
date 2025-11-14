import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Events = () => {
  const { events, categories: eventCategories } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...eventCategories], [eventCategories]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-24 overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-32 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        
        {/* Simplified Animated Blobs - Reduced for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
        </div>

        {/* Floating Particles - Reduced for performance */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse"
            style={{
              left: `${(i * 10) % 100}%`,
              top: `${(i * 12) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          />
        ))}

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-lg md:text-xl shadow-2xl">
              🎉 Explore Our Events
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 30px rgba(255,255,255,0.6)",
                  "0 0 60px rgba(255,255,255,0.9)",
                  "0 0 30px rgba(255,255,255,0.6)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="block mb-2"
            >
              Upcoming Events
            </motion.span>
            <motion.span
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b, #ec4899, #fbbf24)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
              className="block"
            >
              Unforgettable Experiences
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Discover amazing events and experiences waiting for you. Find your perfect event and create memories that last forever.
          </motion.p>

          {/* Event Count Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="mt-8 inline-block"
          >
            <div className="bg-white/20 backdrop-blur-lg border-2 border-white/30 px-6 py-3 rounded-full">
              <span className="text-2xl font-bold">{filteredEvents.length}</span>
              <span className="ml-2 text-lg">Events Available</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex-1 relative"
            >
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-lg"
              />
            </motion.div>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative md:w-64"
            >
              <FaFilter className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-500 text-xl z-10" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-14 pr-8 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 appearance-none bg-white transition-all duration-300 text-lg font-semibold cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </motion.div>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'All') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {searchTerm && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  Search: "{searchTerm}"
                </motion.span>
              )}
              {selectedCategory !== 'All' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Category: {selectedCategory}
                </motion.span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="relative"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🔍
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
