# Quick Start Guide - Eatoes Admin Dashboard

## 5-Minute Setup

Follow these steps to get your Restaurant Admin Dashboard running locally.

### Step 1: MongoDB Setup (2 mins)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up with email/Google
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Save it somewhere safe - you'll need it!

### Step 2: Backend Setup (2 mins)

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file with your MongoDB connection
# Create a new file called ".env" and add:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/eatoes
PORT=5000
NODE_ENV=development

# Start the server
npm run dev
```

**Expected output:**
```
✓ MongoDB Connected
✓ Server running on port 5000
```

### Step 3: Frontend Setup (1 min)

```bash
# Open a new terminal and navigate to client
cd client

# Install dependencies
npm install

# Create .env file
# Create a new file called ".env" and add:
REACT_APP_API_URL=http://localhost:5000

# Start the React app
npm start
```

**It will automatically open at:** `http://localhost:3000`

---

## Database Seeding (Optional)

To populate your database with sample data:

```bash
cd server
npm run seed
```

This adds:
- 15 menu items across all categories
- 10 sample orders with different statuses

---

## Testing the Application

### 1. Menu Management
- Go to http://localhost:3000
- Click "+ Add Item" to create a menu item
- Search for items (uses debouncing!)
- Toggle availability
- Edit or delete items

### 2. Orders Dashboard
- Click "Orders" in the sidebar
- View all orders with pagination
- Change order status
- Click chevron to see details

### 3. Analytics
- Click "Analytics" in the sidebar
- View top 5 selling items
- See revenue tracking

---

## Common Issues & Solutions

### ❌ "Cannot connect to MongoDB"
**Solution:**
- Check your connection string in `.env`
- Make sure IP is whitelisted in MongoDB (set to 0.0.0.0/0)
- Verify username and password

### ❌ "CORS Error" when searching
**Solution:**
- Make sure backend is running (`npm run dev` in server folder)
- Check REACT_APP_API_URL in client/.env

### ❌ "Port 5000 already in use"
**Solution:**
- Change PORT in server/.env to 5001
- Or kill the process using port 5000

### ❌ "Module not found" error
**Solution:**
- Make sure you ran `npm install` in both folders
- Delete node_modules and run `npm install` again

---

## Project Structure at a Glance

```
server/
├── models/          → Database schemas
├── controllers/     → Business logic
├── routes/          → API endpoints
├── config/          → Database connection
└── server.js        → Starts here!

client/
├── components/      → Reusable UI parts
├── pages/          → Full page components
├── hooks/          → Custom React hooks
└── App.jsx         → Starts here!
```

---

## API Endpoints Quick Reference

```
# Menu
GET    /api/menu                   # Get all items
POST   /api/menu                   # Create item
GET    /api/menu/:id               # Get one item
PUT    /api/menu/:id               # Update item
DELETE /api/menu/:id               # Delete item
GET    /api/menu/search?q=...      # Search
PATCH  /api/menu/:id/availability  # Toggle availability

# Orders
GET    /api/orders                 # Get all orders
POST   /api/orders                 # Create order
GET    /api/orders/:id             # Get one order
PATCH  /api/orders/:id/status      # Update status

# Analytics
GET    /api/orders/analytics/top-sellers  # Top 5 items
```

---

## Next Steps (After Getting Comfortable)

1. **Add more features**: User authentication, customer ratings, etc.
2. **Deploy to production**: Follow deployment guide in main README
3. **Improve UI**: Add more charts, better styling
4. **Performance**: Add Redis caching, optimize queries
5. **Testing**: Write unit and integration tests

---

## Debugging Tips

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{ "status": "Server is running" }
```

### Check MongoDB Connection
Look for "✓ MongoDB Connected" in server console

### Monitor API Requests
- Open DevTools (F12) → Network tab
- Perform actions in the app
- See all requests/responses

### Use Postman for API Testing
- Download [Postman](https://www.postman.com/downloads/)
- Import endpoints from documentation
- Test individually before using in React

---

## Support Resources

- Main README: Full documentation
- Backend code: `server/` folder
- Frontend code: `client/src/` folder
- API docs: See main README "API Documentation" section

---

**You're all set! Happy coding! 🚀**
