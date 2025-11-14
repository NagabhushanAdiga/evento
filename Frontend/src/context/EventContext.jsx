import { createContext, useContext, useState, useEffect } from 'react';
import { events as initialEvents, adminUsers } from '../data/eventsData';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem('eventRequests');
    return savedRequests ? JSON.parse(savedRequests) : [];
  });

  const [admins, setAdmins] = useState(() => {
    const savedAdmins = localStorage.getItem('adminUsers');
    return savedAdmins ? JSON.parse(savedAdmins) : adminUsers;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [contactForms, setContactForms] = useState(() => {
    const savedForms = localStorage.getItem('contactForms');
    return savedForms ? JSON.parse(savedForms) : [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      'Marriage/Wedding',
      'Naming Ceremony',
      'Birthday Party',
      'Anniversary',
      'Corporate Event',
      'Graduation',
      'Baby Shower',
      'Engagement',
      'Reception',
      'Other'
    ];
  });

  const [themeSettings, setThemeSettings] = useState(() => {
    const savedTheme = localStorage.getItem('themeSettings');
    return savedTheme ? JSON.parse(savedTheme) : {
      heroImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2940&auto=format&fit=crop',
      heroTitle: 'Transform Your Events Into Unforgettable Experiences',
      heroSubtitle: 'From elegant weddings to corporate galas, we create magical moments that last a lifetime.',
      primaryColor: '#2563eb',
      secondaryColor: '#7c3aed',
      accentColor: '#fbbf24',
      companyName: 'EventPro',
      companyTagline: 'Your dream event, our expertise.'
    };
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventRequests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('contactForms', JSON.stringify(contactForms));
  }, [contactForms]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
  }, [themeSettings]);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      registered: 0,
      capacity: 100, // Default capacity
      date: '',
      time: '',
      location: '',
      organizer: 'EventPro Planning',
      status: 'upcoming'
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => 
      Number(event.id) === Number(id) ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => Number(event.id) !== Number(id)));
  };

  const login = (username, password) => {
    // Bypass authentication - always allow login for development
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    return true;
  };

  const addAdmin = (adminData) => {
    const newAdmin = {
      ...adminData,
      id: Date.now(),
      role: 'admin'
    };
    setAdmins([...admins, newAdmin]);
    return newAdmin;
  };

  const deleteAdmin = (id) => {
    setAdmins(admins.filter(admin => Number(admin.id) !== Number(id)));
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const submitRequest = (eventId, userData) => {
    const event = events.find(e => Number(e.id) === Number(eventId));
    if (!event) return false;
    
    if (event.registered >= event.capacity) {
      return false; // Event is full
    }

    const newRequest = {
      id: Date.now(),
      eventId: Number(eventId),
      eventTitle: event.title,
      userName: userData.name,
      userEmail: userData.email,
      userPhone: userData.phone,
      date: '', // Will be set by admin
      numberOfGuests: '', // Will be set by admin
      location: '', // Will be set by admin
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setRequests([...requests, newRequest]);
    
    // Also add to users list if not exists
    const existingUser = users.find(u => u.email === userData.email);
    if (!existingUser) {
      const newUser = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        eventsRegistered: [Number(eventId)],
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    } else {
      // Update user's registered events
      setUsers(users.map(u => 
        u.email === userData.email
          ? { ...u, eventsRegistered: [...(u.eventsRegistered || []), Number(eventId)] }
          : u
      ));
    }
    
    return true;
  };

  const updateRequestStatus = (requestId, status) => {
    const request = requests.find(r => Number(r.id) === Number(requestId));
    if (!request) return;
    
    const oldStatus = request.status;
    
    setRequests(requests.map(req => 
      Number(req.id) === Number(requestId) 
        ? { ...req, status, updatedAt: new Date().toISOString() }
        : req
    ));

    // Handle registration count changes
    const event = events.find(e => Number(e.id) === Number(request.eventId));
    if (!event) return;

    if (status === 'approved' && oldStatus !== 'approved') {
      // Approving a request that wasn't already approved - increment registration
      if (event.registered < event.capacity) {
        setEvents(events.map(evt => 
          Number(evt.id) === Number(request.eventId)
            ? { ...evt, registered: evt.registered + 1 }
            : evt
        ));
      }
    } else if (status === 'rejected' && oldStatus === 'approved') {
      // Rejecting a previously approved request - decrement registration
      if (event.registered > 0) {
        setEvents(events.map(evt => 
          Number(evt.id) === Number(request.eventId)
            ? { ...evt, registered: evt.registered - 1 }
            : evt
        ));
      }
    }
    // If changing from rejected to approved, increment
    else if (status === 'approved' && oldStatus === 'rejected') {
      if (event.registered < event.capacity) {
        setEvents(events.map(evt => 
          Number(evt.id) === Number(request.eventId)
            ? { ...evt, registered: evt.registered + 1 }
            : evt
        ));
      }
    }
  };

  const deleteRequest = (requestId) => {
    const request = requests.find(r => Number(r.id) === Number(requestId));
    if (!request) return;

    // If deleting an approved request, decrement event registration
    if (request.status === 'approved') {
      const event = events.find(e => Number(e.id) === Number(request.eventId));
      if (event && event.registered > 0) {
        setEvents(events.map(evt => 
          Number(evt.id) === Number(request.eventId)
            ? { ...evt, registered: evt.registered - 1 }
            : evt
        ));
      }
    }

    setRequests(requests.filter(req => Number(req.id) !== Number(requestId)));
  };

  const submitContactForm = (formData) => {
    const newContact = {
      id: Date.now(),
      ...formData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setContactForms([...contactForms, newContact]);
    return true;
  };

  const deleteContactForm = (id) => {
    setContactForms(contactForms.filter(form => Number(form.id) !== Number(id)));
  };

  const updateContactFormStatus = (id, status) => {
    setContactForms(contactForms.map(form => 
      Number(form.id) === Number(id)
        ? { ...form, status, updatedAt: new Date().toISOString() }
        : form
    ));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
  };

  const updateRequest = (requestId, updatedData) => {
    setRequests(requests.map(req => 
      Number(req.id) === Number(requestId)
        ? { ...req, ...updatedData, updatedAt: new Date().toISOString() }
        : req
    ));
  };

  const updateThemeSettings = (settings) => {
    setThemeSettings({ ...themeSettings, ...settings });
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        isAdmin,
        login,
        logout,
        requests,
        submitRequest,
        updateRequestStatus,
        updateRequest,
        deleteRequest,
        admins,
        addAdmin,
        deleteAdmin,
        users,
        contactForms,
        submitContactForm,
        deleteContactForm,
        updateContactFormStatus,
        categories,
        addCategory,
        deleteCategory,
        themeSettings,
        updateThemeSettings
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
