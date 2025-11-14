import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEvents } from '../context/EventContext';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

const AdminLogin = () => {
  const { login, isAdmin } = useEvents();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Bypass authentication - directly log in and navigate to admin dashboard
    login('', '');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex">
      {/* Left Side - Decorative */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 items-center justify-center p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blob-filter"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blob-filter"
          ></motion.div>
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <FaCalendarAlt className="text-9xl mb-6 opacity-20" />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold mb-4"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-blue-100 max-w-md"
          >
            Manage your events, track registrations, and grow your business with EventPro Admin Panel
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EventPro
              </h1>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Admin Login</h2>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Sign In
              <FaArrowRight />
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-gray-600 font-semibold mb-2">Quick Access:</p>
            <div className="text-sm text-gray-700">
              <p>Click "Sign In" to access the admin dashboard directly.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default AdminLogin;