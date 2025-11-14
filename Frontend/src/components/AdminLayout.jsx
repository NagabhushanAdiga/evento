import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../context/EventContext';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaBell,
  FaUsers,
  FaEnvelope,
  FaChartLine,
  FaTag
} from 'react-icons/fa';

const AdminLayout = () => {
  const { isAdmin, logout } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    setShowLogoutConfirm(false);
  };

  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/events', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/admin/requests', icon: <FaEnvelope />, label: 'Requests' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/categories', icon: <FaTag />, label: 'Categories' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl fixed md:static h-screen z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  EventPro Admin
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-white hover:text-yellow-300 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  let isActive = false;
                  if (item.path === '/admin') {
                    isActive = location.pathname === '/admin' || 
                      (location.pathname.startsWith('/admin') && 
                       !location.pathname.includes('/events') && 
                       !location.pathname.includes('/settings') &&
                       !location.pathname.includes('/users') &&
                       !location.pathname.includes('/requests') &&
                       !location.pathname.includes('/reports') &&
                       !location.pathname.includes('/categories'));
                  } else {
                    isActive = location.pathname.startsWith(item.path);
                  }
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-yellow-400 text-gray-900 shadow-lg'
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-blue-700">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  <FaSignOutAlt className="text-xl" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md z-30 flex-shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaBars className="text-2xl" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
                  <FaBell className="text-xl" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  <FaUser />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold text-gray-800">Admin</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSignOutAlt className="text-3xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Logout</h3>
                <p className="text-gray-600">Are you sure you want to logout from the admin panel?</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
