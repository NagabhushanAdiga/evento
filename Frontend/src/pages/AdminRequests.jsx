import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useEvents } from '../context/EventContext';
import { 
  FaEnvelope, 
  FaSearch, 
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaTrash,
  FaClock,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCog,
  FaEdit,
  FaUsers,
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';

const AdminRequests = () => {
  const { requests, updateRequestStatus, updateRequest, deleteRequest, events } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editData, setEditData] = useState({
    date: '',
    numberOfGuests: '',
    location: ''
  });

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationCircle className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const stats = [
    {
      title: 'Total Requests',
      value: requests.length,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending',
      value: requests.filter(r => r.status === 'pending').length,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Approved',
      value: requests.filter(r => r.status === 'approved').length,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Rejected',
      value: requests.filter(r => r.status === 'rejected').length,
      color: 'from-red-500 to-red-600'
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Requests</h1>
          <p className="text-gray-600">Manage all event registration requests from users</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg p-6`}
          >
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-blue-100 font-semibold">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests by name, email, or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-4"
        >
          {filteredRequests.map((request, index) => {
            const event = events.find(e => Number(e.id) === Number(request.eventId));
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {getStatusIcon(request.status)}
                      <h3 className="text-xl font-bold text-gray-800">
                        {request.eventTitle || 'Event Request'}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <FaUser className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Name</div>
                          <div className="font-semibold text-gray-800">{request.userName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-semibold text-gray-800">{request.userEmail}</div>
                        </div>
                      </div>
                      {request.userPhone && (
                        <div className="flex items-center gap-3">
                          <FaPhone className="text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Phone</div>
                            <div className="font-semibold text-gray-800">{request.userPhone}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Event Date</div>
                          <div className="font-semibold text-gray-800">
                            {request.date || 'Not set'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaUsers className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Number of Guests</div>
                          <div className="font-semibold text-gray-800">
                            {request.numberOfGuests || 'Not set'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-semibold text-gray-800">
                            {request.location || 'Not set'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock />
                      <span>Submitted: {new Date(request.createdAt).toLocaleString()}</span>
                      {request.updatedAt && (
                        <>
                          <span>•</span>
                          <span>Updated: {new Date(request.updatedAt).toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedRequest(request);
                        setEditData({
                          date: request.date || '',
                          numberOfGuests: request.numberOfGuests || '',
                          location: request.location || ''
                        });
                        setShowEditModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FaEdit />
                      Edit Details
                    </motion.button>
                    {request.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            updateRequestStatus(request.id, 'approved');
                            toast.success(`Request from ${request.userName} approved successfully!`);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FaCheckCircle />
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            updateRequestStatus(request.id, 'rejected');
                            toast.success(`Request from ${request.userName} rejected.`);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FaTimesCircle />
                          Reject
                        </motion.button>
                      </>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDeleteConfirm(request)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-lg"
        >
          <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl">No requests found matching your criteria.</p>
        </motion.div>
      )}

      {/* Edit Request Modal */}
      <AnimatePresence>
        {showEditModal && selectedRequest && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowEditModal(false);
                setSelectedRequest(null);
              }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Request Details</h2>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedRequest(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Event: <span className="font-semibold text-gray-800">{selectedRequest.eventTitle}</span></p>
                  <p className="text-sm text-gray-600">User: <span className="font-semibold text-gray-800">{selectedRequest.userName}</span></p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateRequest(selectedRequest.id, editData);
                    toast.success(`Request details updated successfully!`);
                    setShowEditModal(false);
                    setSelectedRequest(null);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={editData.date}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUsers className="inline mr-2" />
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editData.numberOfGuests}
                      onChange={(e) => setEditData({ ...editData, numberOfGuests: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter number of guests"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event location"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Request Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(null)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <FaExclamationTriangle className="text-4xl text-red-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Deletion</h3>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this request from {showDeleteConfirm.userName}?
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-gray-800">{showDeleteConfirm.eventTitle}</p>
                    <p className="text-sm text-gray-600 mt-1">{showDeleteConfirm.userEmail}</p>
                  </div>
                  <p className="text-sm text-red-600 font-semibold">
                    This action cannot be undone!
                  </p>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      deleteRequest(showDeleteConfirm.id);
                      toast.success(`Request deleted successfully!`);
                      setShowDeleteConfirm(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminRequests;
