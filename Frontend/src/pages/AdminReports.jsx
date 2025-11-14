import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '../context/EventContext';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaFileExport
} from 'react-icons/fa';

const AdminReports = () => {
  const { events, requests, users, contactForms } = useEvents();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Calculate statistics
  const totalEvents = events.length;
  const totalRequests = requests.length;
  const totalUsers = users.length;
  const totalContacts = contactForms.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const approvedRequests = requests.filter(r => r.status === 'approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'rejected').length;
  
  // Calculate total revenue (sum of all event prices * registered)
  const totalRevenue = events.reduce((sum, event) => sum + (event.price * event.registered), 0);
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const totalRegistered = events.reduce((sum, event) => sum + event.registered, 0);
  const registrationRate = totalCapacity > 0 ? ((totalRegistered / totalCapacity) * 100).toFixed(1) : 0;

  // Event categories distribution
  const categoryDistribution = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  // Request status distribution
  const requestStatusData = [
    { label: 'Pending', value: pendingRequests, color: 'bg-yellow-500' },
    { label: 'Approved', value: approvedRequests, color: 'bg-green-500' },
    { label: 'Rejected', value: rejectedRequests, color: 'bg-red-500' }
  ];

  // Top events by registration
  const topEvents = [...events]
    .sort((a, b) => b.registered - a.registered)
    .slice(0, 5);

  // Stats cards
  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: <FaCalendarAlt className="text-3xl" />,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Requests',
      value: totalRequests,
      icon: <FaEnvelope className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <FaUsers className="text-3xl" />,
      color: 'from-green-500 to-green-600',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign className="text-3xl" />,
      color: 'from-yellow-500 to-orange-600',
      change: '+20%',
      trend: 'up'
    },
    {
      title: 'Contact Forms',
      value: totalContacts,
      icon: <FaEnvelope className="text-3xl" />,
      color: 'from-pink-500 to-pink-600',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Registration Rate',
      value: `${registrationRate}%`,
      icon: <FaChartLine className="text-3xl" />,
      color: 'from-indigo-500 to-indigo-600',
      change: '+3%',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your event management system</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="today">Today</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <FaDownload />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-blue-100 font-semibold">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Status Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Request Status</h2>
            <FaChartPie className="text-3xl text-purple-600" />
          </div>
          <div className="space-y-4">
            {requestStatusData.map((item, index) => {
              const percentage = totalRequests > 0 ? (item.value / totalRequests * 100).toFixed(1) : 0;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{item.label}</span>
                    <span className="text-gray-600">{item.value} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-4 rounded-full ${item.color}`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Event Categories</h2>
            <FaChartBar className="text-3xl text-blue-600" />
          </div>
          <div className="space-y-4">
            {Object.entries(categoryDistribution).map(([category, count], index) => {
              const percentage = totalEvents > 0 ? (count / totalEvents * 100).toFixed(1) : 0;
              const colors = [
                'bg-blue-500',
                'bg-purple-500',
                'bg-green-500',
                'bg-yellow-500',
                'bg-red-500',
                'bg-pink-500',
                'bg-indigo-500',
                'bg-orange-500'
              ];
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{category}</span>
                    <span className="text-gray-600">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-4 rounded-full ${colors[index % colors.length]}`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Events by Registration</h2>
          <FaChartLine className="text-3xl text-green-600" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Event Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Registered</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Capacity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topEvents.map((event, index) => {
                const rate = ((event.registered / event.capacity) * 100).toFixed(1);
                const revenue = event.price * event.registered;
                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800">{event.title}</td>
                    <td className="py-3 px-4 text-gray-600">{event.category}</td>
                    <td className="py-3 px-4 text-gray-600">{event.registered}</td>
                    <td className="py-3 px-4 text-gray-600">{event.capacity}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${rate > 80 ? 'text-green-600' : rate > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {rate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">${revenue.toLocaleString()}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Registration Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Capacity</span>
              <span className="font-bold text-gray-800">{totalCapacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Registered</span>
              <span className="font-bold text-gray-800">{totalRegistered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Spots</span>
              <span className="font-bold text-gray-800">{totalCapacity - totalRegistered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registration Rate</span>
              <span className="font-bold text-green-600">{registrationRate}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Request Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-yellow-600">{pendingRequests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Approved</span>
              <span className="font-bold text-green-600">{approvedRequests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rejected</span>
              <span className="font-bold text-red-600">{rejectedRequests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-gray-800">{totalRequests}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-bold text-gray-800">${totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. per Event</span>
              <span className="font-bold text-gray-800">
                ${totalEvents > 0 ? (totalRevenue / totalEvents).toFixed(2) : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Contacts</span>
              <span className="font-bold text-gray-800">{totalContacts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-bold text-gray-800">{totalUsers}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReports;
