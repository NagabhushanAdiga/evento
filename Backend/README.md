# Event Management System - Backend API

Backend API for the Event Management System built with Node.js, Express, and MongoDB.

## Features

- RESTful API for event management
- JWT authentication for admin access
- MongoDB database with Mongoose ODM
- CRUD operations for Events, Requests, Users, Admins, Categories, Contact Forms, and Theme Settings
- Password hashing with bcryptjs
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd evento/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/evento
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running on your system or update `MONGODB_URI` with your MongoDB Atlas connection string.

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in your `.env` file).

## Seeding Data

To seed the database with initial categories, theme settings, and sample events:

```bash
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Requests
- `GET /api/requests` - Get all requests (Admin only)
- `POST /api/requests` - Submit event request
- `PUT /api/requests/:id/status` - Update request status (Admin only)
- `PUT /api/requests/:id` - Update request details (Admin only)
- `DELETE /api/requests/:id` - Delete request (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)

### Admins
- `GET /api/admins` - Get all admins (Admin only)
- `POST /api/admins` - Create admin (Admin only)
- `DELETE /api/admins/:id` - Delete admin (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `DELETE /api/categories/:name` - Delete category (Admin only)

### Contact Forms
- `GET /api/contacts` - Get all contact forms (Admin only)
- `POST /api/contacts` - Submit contact form
- `PUT /api/contacts/:id/status` - Update contact form status (Admin only)
- `DELETE /api/contacts/:id` - Delete contact form (Admin only)

### Theme Settings
- `GET /api/theme` - Get theme settings
- `PUT /api/theme` - Update theme settings (Admin only)

### Health Check
- `GET /api/health` - Check API health

## Authentication

Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained by logging in via `/api/auth/login`.

## Default Admin Credentials

After running the seed script or first login attempt, a default admin is created:
- Username: `admin`
- Email: `admin@eventpro.com`
- Password: `admin123`

**Note:** Change these credentials in production!

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration time (default: 7d)
- `NODE_ENV` - Environment (development/production)

## Project Structure

```
Backend/
├── config/
│   └── database.js         # MongoDB connection
├── middleware/
│   └── auth.js             # Authentication middleware
├── models/
│   ├── Event.js            # Event model
│   ├── Request.js          # Request model
│   ├── User.js             # User model
│   ├── Admin.js            # Admin model
│   ├── Category.js         # Category model
│   ├── ContactForm.js      # Contact form model
│   └── ThemeSettings.js    # Theme settings model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   ├── eventRoutes.js      # Event routes
│   ├── requestRoutes.js    # Request routes
│   ├── userRoutes.js       # User routes
│   ├── adminRoutes.js      # Admin routes
│   ├── categoryRoutes.js   # Category routes
│   ├── contactRoutes.js    # Contact form routes
│   └── themeRoutes.js      # Theme settings routes
├── scripts/
│   └── seedData.js         # Database seeding script
├── server.js               # Main server file
├── package.json
└── README.md
```

## License

ISC
