import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '../context/EventContext';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaEnvelope, 
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaCog
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { events, requests } = useEvents();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  const filteredRequests = selectedFilter === 'all' 
    ? requests 
    : requests.filter(r => r.status === selectedFilter);

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: <FaCalendarAlt className="text-3xl" />,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Requests',
      value: requests.length,
      icon: <FaEnvelope className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Pending Requests',
      value: pendingRequests.length,
      icon: <FaClock className="text-3xl" />,
      color: 'from-yellow-500 to-yellow-600',
      change: pendingRequests.length > 0 ? `${pendingRequests.length} new` : '0',
      trend: pendingRequests.length > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Total Registrations',
      value: events.reduce((sum, event) => sum + event.registered, 0),
      icon: <FaUsers className="text-3xl" />,
      color: 'from-green-500 to-green-600',
      change: '+15%',
      trend: 'up'
    }
  ];

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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your events.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-200' : 
                stat.trend === 'down' ? 'text-red-200' : 'text-white'
              }`}>
                {stat.trend === 'up' && <FaArrowUp />}
                {stat.trend === 'down' && <FaArrowDown />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-blue-100 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Event Requests</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({requests.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingRequests.length})
            </button>
            <button
              onClick={() => setSelectedFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedFilter === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({approvedRequests.length})
            </button>
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.slice(0, 10).map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaEnvelope className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No requests found</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Link
          to="/admin/events"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Manage Events</h3>
              <p className="text-gray-600">View and manage all your events</p>
            </div>
            <FaCalendarAlt className="text-4xl text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
        </Link>
        <Link
          to="/admin/settings"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600">Configure your admin settings</p>
            </div>
            <FaCog className="text-4xl text-purple-600 group-hover:rotate-90 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

const RequestCard = ({ request }) => {
  const { updateRequestStatus, deleteRequest } = useEvents();
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = () => {
    switch (request.status) {
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationCircle className="text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (request.status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const handleApprove = () => {
    updateRequestStatus(request.id, 'approved');
    setShowActions(false);
  };

  const handleReject = () => {
    updateRequestStatus(request.id, 'rejected');
    setShowActions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon()}
            <h4 className="font-bold text-gray-800">{request.eventTitle}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
              {request.status}
            </span>
          </div>
          <div className="ml-8 space-y-1 text-sm text-gray-600">
            <p><span className="font-semibold">Name:</span> {request.userName}</p>
            <p><span className="font-semibold">Email:</span> {request.userEmail}</p>
            {request.userPhone && (
              <p><span className="font-semibold">Phone:</span> {request.userPhone}</p>
            )}
            <p className="text-xs text-gray-500">
              {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {request.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;