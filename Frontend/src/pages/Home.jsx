import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine, 
  FaHandshake, 
  FaClock, 
  FaAward,
  FaCheckCircle,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';

const Home = () => {
  const { events, themeSettings } = useEvents();
  const featuredEvents = useMemo(() => events.slice(0, 3), [events]);

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

  const features = [
    {
      icon: <FaCalendarAlt className="text-4xl" />,
      title: "Event Planning",
      description: "Complete event planning and management services for any occasion."
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Attendee Management",
      description: "Seamless registration and attendee management system."
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Analytics & Reports",
      description: "Comprehensive analytics and reporting for your events."
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Custom Solutions",
      description: "Tailored event management solutions for your business."
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "24/7 Support",
      description: "Round-the-clock support for all your event needs."
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations",
      content: "EventPro transformed our corporate events. The platform is intuitive and the team is incredibly supportive.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Event Director, Global Summit",
      content: "Best event management solution we've used. The analytics and reporting features are outstanding.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager, Creative Agency",
      content: "The attendee management system saved us countless hours. Highly recommend EventPro!",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Events Managed" },
    { number: "50K+", label: "Happy Attendees" },
    { number: "200+", label: "Clients Served" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative text-white overflow-hidden min-h-screen flex items-center"
        style={{
          background: `linear-gradient(to bottom right, ${themeSettings.primaryColor}, ${themeSettings.secondaryColor})`
        }}
      >
        {/* Animated Background Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${themeSettings.heroImage}')`,
            opacity: 0.2
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Simplified Animated Blobs - Reduced for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
        </div>

        {/* Floating Particles - Reduced for performance */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          />
        ))}

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-lg md:text-xl shadow-2xl">
                ✨ Premium Event Planning Services
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 leading-tight"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,255,255,0.8)",
                    "0 0 20px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="block mb-2"
              >
                {themeSettings.heroTitle}
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-3xl mb-12 text-blue-100 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              {themeSettings.heroSubtitle}
              {themeSettings.companyTagline && (
                <span className="block mt-2" style={{ color: themeSettings.accentColor }}>{themeSettings.companyTagline}</span>
              )}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/events"
                  className="group relative bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-5 px-10 rounded-full text-lg md:text-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10 flex items-center gap-3"
                  >
                    Explore Events
                    <FaArrowRight />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="bg-white/20 backdrop-blur-lg hover:bg-white/30 border-2 border-white/50 text-white font-bold py-5 px-10 rounded-full text-lg md:text-xl transition-all duration-300 shadow-2xl hover:shadow-white/30 flex items-center justify-center gap-3"
                >
                  Plan Your Event
                  <FaArrowRight />
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-blue-200"
              >
                <span className="text-sm font-semibold">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-blue-200 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-blue-200 rounded-full mt-2"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-85"></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"
              style={{
                left: `${(i * 16) % 100}%`,
                top: `${(i * 18) % 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Success in Numbers</h2>
            <p className="text-xl text-blue-200">Trusted by thousands of clients worldwide</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -10 }}
                className="relative"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-blue-200 font-semibold text-lg">{stat.label}</div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mt-4 rounded-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2938&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-6 shadow-lg"
            >
              Why Choose EventPro?
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-6">
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #1e40af, #7c3aed, #db2777, #1e40af)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Excellence in Every Detail
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive event management solutions tailored to your needs with unmatched expertise and dedication
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08, 
                  y: -15,
                  rotateY: 5,
                }}
                className="group relative"
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-300 relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Icon with animation */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mb-6 inline-block"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                      {feature.icon}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                  
                  {/* Decorative element */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section 
        className="py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-blue-50/90 backdrop-blur-sm"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-6 shadow-lg"
            >
              🎉 Upcoming Events
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 mb-6">
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #7c3aed, #db2777, #ec4899, #7c3aed)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Featured Events
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our upcoming events and join the experience of a lifetime
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12"
          >
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="relative"
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-10 rounded-full text-lg md:text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
            >
              View All Events
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2938&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90"></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-pulse"
              style={{
                left: `${(i * 12.5) % 100}%`,
                top: `${(i * 14) % 100}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${4 + (i % 2)}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-lg mb-6 shadow-lg"
            >
              ⭐ Client Testimonials
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(251,191,36,0.5)",
                    "0 0 40px rgba(251,191,36,0.8)",
                    "0 0 20px rgba(251,191,36,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="block"
              >
                What Our Clients Say
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Trusted by hundreds of companies and individuals worldwide
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-lg border-2 border-white/20 p-8 rounded-2xl shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 relative overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex text-yellow-400 mb-6 gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="fill-current text-2xl" />
                      ))}
                    </div>
                    <p className="text-gray-100 mb-6 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t border-white/20 pt-4">
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-blue-200 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 text-yellow-400/20 text-6xl font-bold">
                    "
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-pink-600/95"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8">
              Ready to Elevate
              <span className="block text-yellow-300 mt-2">Your Events?</span>
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium">
              Join thousands of satisfied clients who trust EventPro for their event management needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 px-12 rounded-full text-xl md:text-2xl transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-3"
              >
                Get Started Today
                <FaArrowRight className="text-2xl" />
              </Link>
              
              <Link
                to="/events"
                className="bg-white/20 backdrop-blur-lg hover:bg-white/30 border-2 border-white/50 text-white font-bold py-6 px-12 rounded-full text-xl md:text-2xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
              >
                Browse Events
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
