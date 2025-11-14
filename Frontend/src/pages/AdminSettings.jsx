import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useEvents } from '../context/EventContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaBell, 
  FaSave,
  FaKey,
  FaShieldAlt,
  FaPalette,
  FaImage,
  FaTextHeight,
  FaBuilding
} from 'react-icons/fa';

const AdminSettings = () => {
  const { themeSettings, updateThemeSettings } = useEvents();
  const [settings, setSettings] = useState({
    name: 'Admin User',
    email: 'admin@eventpro.com',
    notifications: true,
    emailNotifications: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [theme, setTheme] = useState(themeSettings);
  const [activeTab, setActiveTab] = useState('theme');

  useEffect(() => {
    setTheme(themeSettings);
  }, [themeSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    toast.success('Settings saved successfully!');
  };

  const handleThemeChange = (field, value) => {
    setTheme({ ...theme, [field]: value });
  };

  const handleThemeSave = () => {
    updateThemeSettings(theme);
    toast.success('Theme settings saved successfully!');
  };

  const tabs = [
    { id: 'theme', label: 'Theme', icon: <FaPalette /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Theme Settings</h2>
            <p className="text-gray-600 mb-6">Control the appearance of your user-facing website</p>
            
            {/* Hero Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaImage className="inline mr-2" />
                Hero Background Image URL
              </label>
              <input
                type="url"
                value={theme.heroImage}
                onChange={(e) => handleThemeChange('heroImage', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URL"
              />
              {theme.heroImage && (
                <img
                  src={theme.heroImage}
                  alt="Hero preview"
                  className="mt-3 w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Hero Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaTextHeight className="inline mr-2" />
                Hero Title
              </label>
              <input
                type="text"
                value={theme.heroTitle}
                onChange={(e) => handleThemeChange('heroTitle', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter hero title"
              />
            </div>

            {/* Hero Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaTextHeight className="inline mr-2" />
                Hero Subtitle
              </label>
              <textarea
                value={theme.heroSubtitle}
                onChange={(e) => handleThemeChange('heroSubtitle', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter hero subtitle"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBuilding className="inline mr-2" />
                Company Name
              </label>
              <input
                type="text"
                value={theme.companyName}
                onChange={(e) => handleThemeChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            {/* Company Tagline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaTextHeight className="inline mr-2" />
                Company Tagline
              </label>
              <input
                type="text"
                value={theme.companyTagline}
                onChange={(e) => handleThemeChange('companyTagline', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company tagline"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaPalette className="inline mr-2" />
                  Primary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                    className="w-16 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaPalette className="inline mr-2" />
                  Secondary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                    className="w-16 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#7c3aed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaPalette className="inline mr-2" />
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                    className="w-16 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.accentColor}
                    onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#fbbf24"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleThemeSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <FaSave />
                Save Theme Settings
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="currentPassword"
                  value={settings.currentPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="newPassword"
                  value={settings.newPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FaShieldAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={settings.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications in the browser</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <span className={`absolute h-6 w-6 bg-white rounded-full top-1 transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}></span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="opacity-0 w-0 h-0"
                />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <span className={`absolute h-6 w-6 bg-white rounded-full top-1 transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}></span>
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FaSave />
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
