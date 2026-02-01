# Eatoes Restaurant Admin Dashboard

A full-stack MERN application for managing restaurant menus, orders, and inventory with real-time updates and advanced features.

## Features

✅ **Menu Management**
- Create, read, update, delete menu items
- Filter by category and price range
- Search with debouncing for performance
- Toggle availability with optimistic UI updates
- Categorization: Appetizer, Main Course, Dessert, Beverage

✅ **Order Management**
- View all orders with pagination
- Filter orders by status (Pending, Preparing, Ready, Delivered, Cancelled)
- Update order status in real-time
- View detailed order information

✅ **Analytics Dashboard**
- Top 5 selling menu items
- Revenue tracking
- Sales aggregation using MongoDB

✅ **Advanced Features**
- Debounced search (300ms delay)
- Optimistic UI updates with rollback
- MongoDB text indexing for fast search
- CORS enabled for frontend-backend communication
- Input validation with express-validator

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18+, React Router, Axios, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB Atlas (Cloud) |
| **Deployment** | Render (Backend), Netlify (Frontend) |

## Prerequisites

- **Node.js** v18 or higher
- **npm** or yarn
- **MongoDB Atlas** account (free tier)
- **Postman** or REST Client for API testing
- **Git** for version control

## Project Structure

```
eatoes/
├── server/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── MenuItem.js        # Menu schema
│   │   └── Order.js           # Order schema
│   ├── controllers/
│   │   ├── menuController.js  # Menu logic
│   │   └── orderController.js # Order logic
│   ├── routes/
│   │   ├── menuRoutes.js      # Menu endpoints
│   │   └── orderRoutes.js     # Order endpoints
│   ├── scripts/
│   │   └── seed.js            # Seed database
│   ├── server.js              # Entry point
│   ├── .env.example           # Environment template
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Toast.jsx
    │   │   ├── MenuCard.jsx
    │   │   └── MenuModal.jsx
    │   ├── hooks/
    │   │   ├── useDebounce.js
    │   │   └── useFetch.js
    │   ├── context/
    │   │   └── MenuContext.js
    │   ├── pages/
    │   │   ├── MenuManagement.jsx
    │   │   ├── OrdersDashboard.jsx
    │   │   └── Analytics.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    ├── .env.example
    └── package.json
```

## Installation & Setup

### 1. Clone the Repository

```bash
cd "c:\Users\saiki\OneDrive\Desktop\Eatoes Intern Assessment"
git init
git add .
git commit -m "Initial commit"
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/eatoes?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" and select "Connect your application"
4. Copy the connection string and replace `username` and `password`

### 3. Seed Database (Optional)

```bash
npm run seed
```

This populates the database with 15 sample menu items and 10 orders.

### 4. Start Backend Server

```bash
npm run dev
# or for production
npm start
```

The server will run on `http://localhost:5000`

### 5. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder:

```
REACT_APP_API_URL=http://localhost:5000
```

### 6. Start Frontend

```bash
npm start
```

The React app will open on `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Menu Endpoints

#### Get All Menu Items
```
GET /menu
Query Parameters:
  - category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage'
  - availability: true | false
  - minPrice: number
  - maxPrice: number

Response:
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "...",
      "name": "Caesar Salad",
      "description": "...",
      "category": "Appetizer",
      "price": 8.99,
      "isAvailable": true,
      "preparationTime": 5,
      "ingredients": ["Lettuce", "Parmesan"],
      "createdAt": "2024-01-31T...",
      "updatedAt": "2024-01-31T..."
    }
  ]
}
```

#### Search Menu Items
```
GET /menu/search?q=chicken
Response:
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

#### Get Menu Item by ID
```
GET /menu/:id
```

#### Create Menu Item
```
POST /menu
Body:
{
  "name": "Grilled Fish",
  "description": "Fresh grilled fish",
  "category": "Main Course",
  "price": 18.99,
  "preparationTime": 15,
  "ingredients": ["Fish", "Lemon", "Herbs"]
}
```

#### Update Menu Item
```
PUT /menu/:id
Body: (same as POST)
```

#### Delete Menu Item
```
DELETE /menu/:id
```

#### Toggle Availability
```
PATCH /menu/:id/availability
Response: Updated menu item with toggled isAvailable
```

### Order Endpoints

#### Get All Orders
```
GET /orders
Query Parameters:
  - status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled'
  - page: number (default: 1)
  - limit: number (default: 10)

Response:
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [...]
}
```

#### Get Order by ID
```
GET /orders/:id
```

#### Create Order
```
POST /orders
Body:
{
  "items": [
    {
      "menuItem": "64a7f3e1c2d4e5f6g7h8i9j0",
      "quantity": 2,
      "price": 8.99
    }
  ],
  "customerName": "John Doe",
  "tableNumber": 5
}
```

#### Update Order Status
```
PATCH /orders/:id/status
Body:
{
  "status": "Preparing"
}
```

#### Get Top Sellers
```
GET /orders/analytics/top-sellers
Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "totalQty": 25,
      "totalRevenue": 224.75,
      "details": [
        {
          "_id": "...",
          "name": "Grilled Salmon",
          ...
        }
      ]
    }
  ]
}
```

## Testing API Endpoints

### Using Postman

1. Open Postman
2. Create a new request
3. Select GET/POST/PUT/PATCH/DELETE
4. Enter URL: `http://localhost:5000/api/menu`
5. Add headers if needed: `Content-Type: application/json`
6. For POST/PUT/PATCH, add JSON body
7. Click Send

### Using VS Code REST Client Extension

Create a file `requests.http`:

```http
### Get all menu items
GET http://localhost:5000/api/menu

### Create menu item
POST http://localhost:5000/api/menu
Content-Type: application/json

{
  "name": "New Dish",
  "description": "Delicious dish",
  "category": "Main Course",
  "price": 15.99,
  "preparationTime": 12,
  "ingredients": ["Ingredient1", "Ingredient2"]
}

### Search menu items
GET http://localhost:5000/api/menu/search?q=salad

### Toggle availability
PATCH http://localhost:5000/api/menu/{itemId}/availability
```

Then right-click and select "Send Request"

## Key Features Explanation

### 1. **Debounced Search**
The search feature waits 300ms after the user stops typing before making an API call. This reduces unnecessary requests and improves performance.

**How it works:**
- User types in search box
- `useDebounce` hook delays the search
- API call only made after 300ms of inactivity
- Results displayed in real-time

### 2. **Optimistic UI Updates**
When toggling availability, the UI updates immediately without waiting for the server response. If the request fails, the UI reverts to the previous state.

**Flow:**
1. User clicks toggle button
2. Local state updates immediately (optimistic)
3. API request sent in background
4. On success: UI stays updated
5. On failure: UI reverts and error message shown

### 3. **MongoDB Aggregation (Top Sellers)**
Uses MongoDB's aggregation pipeline to calculate the top 5 selling items:
- `$unwind`: Flattens order items array
- `$group`: Aggregates quantities by item
- `$lookup`: Joins with menu items collection
- `$sort` & `$limit`: Orders and limits results

## Deployment Guide

### Deploy Backend to Render

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Service**
   - Click "New" → "Web Service"
   - Select your GitHub repository
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: production
     - `PORT`: 5000

4. **Note the URL** (e.g., `https://eatoes-api.onrender.com`)

### Deploy Frontend to Netlify

1. **Build React App**
   ```bash
   cd client
   npm run build
   ```

2. **Create Netlify Account**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up with GitHub

3. **Connect Repository**
   - Click "New site from Git"
   - Select your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Add Environment Variable**
   - In Netlify dashboard → Site Settings → Build & Deploy
   - Add `REACT_APP_API_URL`: Your Render backend URL

5. **Deploy**
   - Netlify auto-deploys on git push

## Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB connection string in `.env`
- Ensure IP is whitelisted in MongoDB Atlas (0.0.0.0/0 for development)
- Verify username and password

### Frontend showing CORS errors
- Add `cors()` middleware in server.js (already done)
- Check if backend API_URL is correct in `.env`

### Search not working
- Ensure text index is created on MenuItem model
- Run `npm run seed` to reinitialize database with indexes

### Port 5000 already in use
- Change PORT in server `.env`
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

## Technologies Used

### Frontend
- **React 18**: UI library with Hooks for state management
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icons

### Backend
- **Express.js**: Minimal web framework
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-Origin Resource Sharing
- **express-validator**: Input validation
- **dotenv**: Environment variable management

### Database
- **MongoDB**: NoSQL document database
- **Text Indexing**: Full-text search capability
- **Aggregation Pipeline**: Complex data queries

## Learning Outcomes

This project demonstrates proficiency in:
✅ Full-stack MERN development
✅ RESTful API design and implementation
✅ MongoDB schema design and optimization
✅ React best practices and hooks
✅ State management patterns
✅ Performance optimization (debouncing)
✅ Error handling and validation
✅ Production deployment
✅ Database indexing and aggregation
✅ Component composition and reusability

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Role-based access control (Admin/Staff)
- [ ] Order notifications (WebSocket)
- [ ] Image uploads for menu items
- [ ] PDF invoice generation
- [ ] Email notifications
- [ ] Analytics charts and graphs
- [ ] Mobile app (React Native)
- [ ] Inventory management system
- [ ] Customer feedback/ratings

## License

MIT License - Feel free to use this project for learning and development.

## Support

For questions or issues, please refer to the README or consult the API documentation above.

---

**Built with ❤️ for the Eatoes Internship Program**
