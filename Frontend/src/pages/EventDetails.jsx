import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { 
  FaDollarSign, 
  FaUsers, 
  FaArrowLeft,
  FaCheckCircle,
  FaTicketAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaUser
} from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, submitRequest } = useEvents();
  const event = useMemo(() => events.find(e => Number(e.id) === Number(id)), [events, id]);
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [requestStatus, setRequestStatus] = useState(null);

  const availableSpots = useMemo(() => event ? event.capacity - event.registered : 0, [event]);
  const registrationPercentage = useMemo(() => event ? (event.registered / event.capacity) * 100 : 0, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-24">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/events')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-semibold transition-colors"
        >
          <FaArrowLeft />
          Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full font-semibold mb-4">
                    {event.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {event.title}
                  </h1>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Event</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                    <FaDollarSign className="text-4xl text-green-600 mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Price</h3>
                    <p className="text-gray-600 text-2xl font-bold">${event.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">per package</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                    <FaUsers className="text-4xl text-purple-600 mb-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Category</h3>
                    <p className="text-gray-600 text-lg font-semibold">{event.category}</p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">Registration Status</h3>
                    <span className="font-semibold text-gray-700">
                      {event.registered}/{event.capacity} registered
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      style={{ width: `${registrationPercentage}%` }}
                      className={`h-4 rounded-full transition-all duration-1000 ${
                        availableSpots > 10 ? 'bg-green-500' : 
                        availableSpots > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  <p className={`text-center font-semibold ${
                    availableSpots > 10 ? 'text-green-600' : 
                    availableSpots > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {availableSpots > 0 ? `${availableSpots} spots available` : 'Fully Booked'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Request Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <FaTicketAlt className="text-5xl mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold text-gray-800 mb-2">${event.price.toLocaleString()}</div>
                <div className="text-gray-600">Event Package</div>
              </div>

              {requestStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-5xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Request Submitted!</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Your registration request has been sent to the admin. You will receive a confirmation email once approved.
                  </p>
                  <button
                    onClick={() => {
                      setRequestStatus(null);
                      setRequestData({ name: '', email: '', phone: '' });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Registration</h3>
                  <p className="text-gray-600 mb-6 text-sm">Fill in your details to request registration for this event</p>
                  
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (submitRequest(event.id, requestData)) {
                        setRequestStatus('success');
                        toast.success('Registration request submitted successfully!');
                      } else {
                        toast.error('Failed to submit request. Event may be full.');
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaUser className="inline mr-2 text-gray-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={requestData.name}
                        onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-2 text-gray-400" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={requestData.email}
                        onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaPhone className="inline mr-2 text-gray-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={requestData.phone}
                        onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone (optional)"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={availableSpots === 0}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                        availableSpots > 0
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl'
                          : 'bg-gray-400 cursor-not-allowed text-gray-700'
                      }`}
                    >
                      <FaPaperPlane />
                      {availableSpots > 0 ? 'Submit Request' : 'Event Full'}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>Admin approval required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>Email confirmation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>Secure registration</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;