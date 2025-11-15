const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (username, password) => {
    // If no credentials provided, allow bypass for development
    if (!username && !password) {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: {}
      });
      localStorage.setItem('adminToken', response.token);
      return response;
    }
    
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: { username, password }
    });
    
    if (response.success && response.token) {
      localStorage.setItem('adminToken', response.token);
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  }
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    return apiRequest('/events');
  },

  getById: async (id) => {
    return apiRequest(`/events/${id}`);
  },

  create: async (eventData) => {
    return apiRequest('/events', {
      method: 'POST',
      body: eventData
    });
  },

  update: async (id, eventData) => {
    return apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: eventData
    });
  },

  delete: async (id) => {
    return apiRequest(`/events/${id}`, {
      method: 'DELETE'
    });
  }
};

// Requests API
export const requestsAPI = {
  getAll: async () => {
    return apiRequest('/requests');
  },

  create: async (requestData) => {
    return apiRequest('/requests', {
      method: 'POST',
      body: requestData
    });
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/requests/${id}/status`, {
      method: 'PUT',
      body: { status }
    });
  },

  update: async (id, requestData) => {
    return apiRequest(`/requests/${id}`, {
      method: 'PUT',
      body: requestData
    });
  },

  delete: async (id) => {
    return apiRequest(`/requests/${id}`, {
      method: 'DELETE'
    });
  }
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return apiRequest('/users');
  }
};

// Admins API
export const adminsAPI = {
  getAll: async () => {
    return apiRequest('/admins');
  },

  create: async (adminData) => {
    return apiRequest('/admins', {
      method: 'POST',
      body: adminData
    });
  },

  delete: async (id) => {
    return apiRequest(`/admins/${id}`, {
      method: 'DELETE'
    });
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    return apiRequest('/categories');
  },

  create: async (name) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: { name }
    });
  },

  delete: async (name) => {
    return apiRequest(`/categories/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    });
  }
};

// Contact Forms API
export const contactsAPI = {
  getAll: async () => {
    return apiRequest('/contacts');
  },

  create: async (formData) => {
    return apiRequest('/contacts', {
      method: 'POST',
      body: formData
    });
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/contacts/${id}/status`, {
      method: 'PUT',
      body: { status }
    });
  },

  delete: async (id) => {
    return apiRequest(`/contacts/${id}`, {
      method: 'DELETE'
    });
  }
};

// Theme Settings API
export const themeAPI = {
  get: async () => {
    return apiRequest('/theme');
  },

  update: async (settings) => {
    return apiRequest('/theme', {
      method: 'PUT',
      body: settings
    });
  }
};

export default {
  authAPI,
  eventsAPI,
  requestsAPI,
  usersAPI,
  adminsAPI,
  categoriesAPI,
  contactsAPI,
  themeAPI
};

