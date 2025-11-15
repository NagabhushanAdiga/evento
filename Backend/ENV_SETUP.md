# Environment Setup Instructions

## 1. Create .env file

In the `Backend` directory, create a `.env` file with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/evento
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

## 2. MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service
3. The connection string `mongodb://localhost:27017/evento` should work

### Option B: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string
5. Make sure to whitelist your IP address in Atlas

## 3. Install Dependencies

```bash
cd evento/Backend
npm install
```

## 4. Seed Database (Optional)

To populate the database with initial categories, theme settings, and sample events:

```bash
npm run seed
```

## 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 6. Frontend Configuration

In the Frontend directory, create a `.env` file (or update `vite.config.js`) with:

```env
VITE_API_URL=http://localhost:5000/api
```

This tells the frontend where to find the backend API.

