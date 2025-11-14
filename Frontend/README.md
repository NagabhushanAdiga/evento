# Event Management System

A modern event management system built with React 18 and Tailwind CSS.

## Features

- **Event Listing**: Browse and search through events
- **Event Details**: View detailed information about each event
- **Admin Dashboard**: Manage events with full CRUD operations
- **Admin Authentication**: Secure admin login system
- **Category Filtering**: Filter events by category
- **Search Functionality**: Search events by title or description
- **Responsive Design**: Works on all devices

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Vite
- Local Storage for data persistence

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Admin Access

### Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

Alternatively:
- **Username**: `manager`
- **Password**: `manager123`

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Navbar.jsx
│   └── EventCard.jsx
├── pages/            # Page components
│   ├── EventList.jsx
│   ├── EventDetails.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── CreateEvent.jsx
│   └── EditEvent.jsx
├── context/          # React Context for state management
│   └── EventContext.jsx
└── data/            # Static data
    └── eventsData.js
```

## Features in Detail

### User Features
- View all events
- Search events
- Filter by category
- View event details
- See registration status and availability

### Admin Features
- Login/Logout
- View all events
- Create new events
- Edit existing events
- Delete events
- View event statistics

## Data Storage

Events are stored in local storage, so they persist across browser sessions. To reset the data, clear your browser's local storage.

## License

MIT