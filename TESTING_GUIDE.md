# Testing Guide - Eatoes Admin Dashboard

## How to Test the Application

This guide shows you how to verify everything works correctly.

---

## Part 1: Backend API Testing

### Option A: Using Postman (Recommended for beginners)

1. **Download Postman**: [postman.com/downloads](https://www.postman.com/downloads)

2. **Create a Workspace**
   - Open Postman
   - Create a new workspace for Eatoes

3. **Test Health Check**
   - Method: GET
   - URL: `http://localhost:5000/api/health`
   - Click "Send"
   - Should return: `{ "status": "Server is running" }`

4. **Get All Menu Items**
   - Method: GET
   - URL: `http://localhost:5000/api/menu`
   - Click "Send"
   - Should return array of menu items

5. **Create a Menu Item**
   - Method: POST
   - URL: `http://localhost:5000/api/menu`
   - Go to "Body" tab → "raw" → "JSON"
   - Paste this:
   ```json
   {
     "name": "Test Burger",
     "description": "A delicious test burger",
     "category": "Main Course",
     "price": 12.99,
     "preparationTime": 10,
     "ingredients": ["Beef", "Bun", "Lettuce"]
   }
   ```
   - Click "Send"
   - Should return the created item with ID

### Option B: Using curl (Command Line)

```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Search menu items
curl http://localhost:5000/api/menu/search?q=salad

# Create menu item
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "description": "Test",
    "category": "Appetizer",
    "price": 5.99
  }'
```

### Option C: Using VS Code REST Client

1. Install "REST Client" extension
2. Create file `test.http` in project root
3. Add this and right-click "Send Request":

```http
### Get all menu items
GET http://localhost:5000/api/menu

### Search
GET http://localhost:5000/api/menu/search?q=salad

### Create item
POST http://localhost:5000/api/menu
Content-Type: application/json

{
  "name": "Grilled Cheese",
  "category": "Main Course",
  "price": 8.99,
  "ingredients": ["Bread", "Cheese"]
}
```

---

## Part 2: Frontend Testing

### Test Menu Management Page

**Test 1: View Menu Items**
- [ ] Navigate to http://localhost:3000
- [ ] See menu items displayed in a grid
- [ ] Each card shows name, price, category, availability

**Test 2: Search Functionality**
- [ ] Type "salmon" in search box
- [ ] Wait 300ms (debounce delay)
- [ ] See filtered results
- [ ] Clear search, see all items return
- [ ] Try searching for "pasta", "chicken", "cake"

**Test 3: Filter by Category**
- [ ] Click category dropdown
- [ ] Select "Main Course"
- [ ] See only Main Course items
- [ ] Try other categories
- [ ] Select "All Categories" - see everything

**Test 4: Add Menu Item**
- [ ] Click "+ Add Item"
- [ ] See modal form open
- [ ] Fill in all fields:
  - Name: "Test Dish"
  - Description: "This is a test"
  - Category: "Main Course"
  - Price: "15.99"
  - Prep Time: "15"
  - Ingredients: "Rice, Beans"
- [ ] Click "Save"
- [ ] See success toast notification
- [ ] New item appears in grid

**Test 5: Edit Menu Item**
- [ ] Click "Edit" on any item
- [ ] Modal opens with current values
- [ ] Change price to higher amount
- [ ] Click "Save"
- [ ] Item updates in list with new price

**Test 6: Delete Menu Item**
- [ ] Click "Delete" on an item
- [ ] Confirm deletion in dialog
- [ ] Item disappears from list
- [ ] Success notification appears

**Test 7: Toggle Availability**
- [ ] Find any menu item
- [ ] Click "Toggle" button
- [ ] Status changes IMMEDIATELY (optimistic update)
- [ ] Look for notification
- [ ] If backend call fails, should revert

### Test Orders Dashboard

**Test 1: View Orders**
- [ ] Click "Orders" in sidebar
- [ ] See table with orders
- [ ] See columns: Order#, Customer, Total, Status, Created

**Test 2: Filter by Status**
- [ ] Select "Pending" in status dropdown
- [ ] See only Pending orders
- [ ] Try "Preparing", "Ready", "Delivered"
- [ ] Select "All Statuses" - see everything

**Test 3: Update Order Status**
- [ ] Click status dropdown on any order
- [ ] Select new status (e.g., "Preparing")
- [ ] Status updates instantly
- [ ] Success notification appears

**Test 4: View Order Details**
- [ ] Click chevron (^) on any order row
- [ ] Row expands showing items in order
- [ ] See each item with quantity and price
- [ ] Click again to collapse

**Test 5: Pagination**
- [ ] Navigate through pages
- [ ] See correct page number
- [ ] Previous/Next buttons enable/disable correctly

### Test Analytics Page

**Test 1: View Top Sellers**
- [ ] Click "Analytics" in sidebar
- [ ] See "Top 5 Selling Items" section
- [ ] Each item shows:
  - Rank (1-5)
  - Item name
  - Quantity sold
  - Total revenue

**Test 2: Data Accuracy**
- [ ] Check that totals match orders
- [ ] Verify revenue calculations

---

## Part 3: Error Handling Tests

### Test Validation

**Test Missing Fields**
```
In Postman:
POST /api/menu
{
  "name": "Test"
  // Missing: category, price
}
```
Should return validation error

**Test Invalid Category**
```
{
  "name": "Item",
  "category": "Invalid",
  "price": 10
}
```
Should return error (only Appetizer, Main Course, Dessert, Beverage allowed)

### Test Network Errors

**Stop Backend Server**
- Kill server process
- Try to search in frontend
- Should see error notification
- Restart server

**Test Rollback on Error**
- Mock network error (turn off WiFi)
- Click toggle availability
- UI updates optimistically
- When call fails, UI should revert
- Error toast should appear

---

## Part 4: Database Testing

### Check Seeded Data

```bash
# Run seed script
cd server
npm run seed
```

**Then verify:**
- [ ] 15 menu items created
- [ ] 10 orders created
- [ ] All items have categories
- [ ] All orders have customers

### Check Text Search Index

```bash
# In Postman:
GET http://localhost:5000/api/menu/search?q=salmon
```
Should find "Grilled Salmon" item

### Check Aggregation

```bash
# In Postman:
GET http://localhost:5000/api/orders/analytics/top-sellers
```
Should return top 5 items by quantity

---

## Part 5: Performance Testing

### Debounce Test
- Open DevTools (F12) → Network tab
- Search for "chicken"
- Type c-h-i-c-k-e-n (each letter)
- Should see only 1 API call (not 7!)
- This proves debouncing works

### Pagination Test
- Create lots of orders (seed data has 10)
- Verify pagination works
- Check "Showing 10 of X" message

---

## Part 6: UI/UX Testing

### Responsive Design
- [ ] Open on desktop (full width)
- [ ] Open on tablet (DevTools F12 → responsive mode)
- [ ] Layout should adjust appropriately
- [ ] Elements should be clickable on all sizes

### Toast Notifications
- [ ] Add item → see success toast
- [ ] Delete item → see success toast
- [ ] Search fails → see error toast
- [ ] Toast should auto-dismiss after 3 seconds

### Loading States
- [ ] While searching, should see feedback
- [ ] While loading orders, should show loader
- [ ] Buttons should be disabled during operations

---

## Part 7: Integration Testing

### Complete Workflow Test

**Scenario: Restaurant manager's daily tasks**

1. **Morning: Update Menu**
   - [ ] Add new daily special
   - [ ] Mark unavailable items (out of stock)
   - [ ] Update prices if needed

2. **During Service: Manage Orders**
   - [ ] View incoming orders
   - [ ] Update order statuses
   - [ ] Mark as delivered

3. **Evening: Check Analytics**
   - [ ] View top selling items
   - [ ] Note revenue
   - [ ] Plan next day's menu

---

## Troubleshooting Test Failures

### Backend Returns Error 500

**Check:**
1. Is MongoDB connected? (look for "✓ MongoDB Connected" in console)
2. Is the request body valid JSON?
3. Are required fields present?

### Search Returns Empty

**Check:**
1. Are items in database? (GET /menu should show items)
2. Is the search term spelled correctly?
3. Did you seed the database?

### Frontend Shows "Cannot reach server"

**Check:**
1. Is backend running? (`npm run dev` in server folder)
2. Is backend on port 5000?
3. Is REACT_APP_API_URL correct in client/.env?

### Optimistic Update Shows Old Value

**This is normal** - UI updates immediately, then reverts if server fails

---

## Performance Checklist

- [ ] Search debounces correctly
- [ ] No more than 1 search request per 300ms
- [ ] Pages load in under 2 seconds
- [ ] Toggle availability responds instantly
- [ ] Pagination works smoothly

---

## Security Quick Tests

- [ ] Can't POST empty required fields
- [ ] Invalid category values rejected
- [ ] Invalid prices rejected
- [ ] Orders can only have positive quantities
- [ ] MongoDB injection attempts fail

---

## Sign-Off Checklist

When all tests pass:

- [ ] Backend API working
- [ ] Frontend loads correctly
- [ ] Menu CRUD operations work
- [ ] Orders display and update
- [ ] Analytics shows data
- [ ] Search with debouncing works
- [ ] Optimistic updates work
- [ ] Error handling works
- [ ] Notifications appear
- [ ] Responsive design works
- [ ] No console errors
- [ ] Database seeding works

---

**When you can check all boxes, you're ready for deployment!** 🚀
