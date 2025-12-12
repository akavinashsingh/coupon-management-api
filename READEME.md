# Coupon Management System

**Assignment Name:** Coupon Management  
**Role:** Software Developer

A simple yet powerful e-commerce coupon management system with RESTful API endpoints for creating coupons and finding the best applicable coupon for users based on eligibility rules.

---

## 🎯 Project Overview

This system provides a backend API for managing discount coupons in an e-commerce platform. It supports:
- Creating coupons with complex eligibility rules
- Finding the best matching coupon for a given user and cart
- User-based and cart-based eligibility criteria
- Both FLAT and PERCENT discount types
- Deterministic best-coupon selection logic

---

## 🛠️ Tech Stack

- **Language:** Node.js (JavaScript)
- **Framework:** Express.js 4.18.2
- **Storage:** In-memory (no database required)
- **Additional Libraries:**
  - `cors` - Cross-Origin Resource Sharing support
  - `nodemon` - Development auto-restart (optional)

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** version 18.0.0 or higher
- **npm** (comes with Node.js)

To check your Node.js version:
```bash
node --version
```

To install Node.js, visit: https://nodejs.org/

---

## 🚀 How to Run

### Step 1: Clone or Download the Project

If you have the project in a Git repository:
```bash
git clone <your-repo-url>
cd coupon-management-api
```

Or create a new directory and add the files manually:
```bash
mkdir coupon-management-api
cd coupon-management-api
```

### Step 2: Create Project Files

Create these files in your project directory:

**1. package.json** (see provided file)
**2. server.js** (see provided file)
**3. test.js** (see provided file)

### Step 3: Install Dependencies

Run this command in your project directory:
```bash
npm install
```

This will install Express.js, CORS, and Nodemon.

### Step 4: Start the Server

**Option A: Production mode**
```bash
npm start
```

**Option B: Development mode (auto-restart on file changes)**
```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════╗
║   Coupon Management API Server Started    ║
╠═══════════════════════════════════════════╣
║   Port: 3000                               ║
║   Status: Running                          ║
║                                            ║
║   Demo Credentials:                        ║
║   Email: hire-me@anshumat.org             ║
║   Password: HireMe@2025!                   ║
╚═══════════════════════════════════════════╝
```

The API is now running at: **http://localhost:3000**

---

## 🧪 How to Run Tests

The project includes a simple test script to verify all endpoints.

### Option 1: Using the test script

**Important:** Make sure the server is running in one terminal before running tests.

Open a **second terminal** and run:
```bash
npm test
```

This will test all API endpoints and show results.

### Option 2: Manual testing with cURL

**Health Check:**
```bash
curl http://localhost:3000/
```

**Get All Coupons:**
```bash
curl http://localhost:3000/api/coupons
```

**Create a Coupon:**
```bash
curl -X POST http://localhost:3000/api/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE100",
    "description": "Save 100 rupees",
    "discountType": "FLAT",
    "discountValue": 100,
    "maxDiscountAmount": null,
    "startDate": "2024-01-01",
    "endDate": "2025-12-31",
    "usageLimitPerUser": 1,
    "eligibility": {
      "allowedUserTiers": [],
      "minLifetimeSpend": null,
      "minOrdersPlaced": null,
      "firstOrderOnly": false,
      "allowedCountries": [],
      "minCartValue": 500,
      "applicableCategories": [],
      "excludedCategories": [],
      "minItemsCount": null
    }
  }'
```

**Find Best Coupon:**
```bash
curl -X POST http://localhost:3000/api/coupons/best \
  -H "Content-Type: application/json" \
  -d '{
    "userContext": {
      "userId": "u123",
      "userTier": "NEW",
      "country": "IN",
      "lifetimeSpend": 1200,
      "ordersPlaced": 0
    },
    "cart": {
      "items": [
        {
          "productId": "p1",
          "category": "electronics",
          "unitPrice": 1500,
          "quantity": 1
        }
      ]
    }
  }'
```

### Option 3: Using Postman

1. Import the API endpoints into Postman
2. Set base URL: `http://localhost:3000`
3. Test each endpoint with the examples above

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Health Check
**GET** `/`

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Coupon Management API",
  "version": "1.0.0",
  "endpoints": {
    "POST /api/coupons": "Create a new coupon",
    "GET /api/coupons": "Get all coupons",
    "POST /api/coupons/best": "Find best coupon for user and cart",
    "POST /api/auth/login": "Login with demo credentials"
  }
}
```

---

#### 2. Create Coupon
**POST** `/api/coupons`

Creates a new coupon with eligibility rules.

**Request Body:**
```json
{
  "code": "WELCOME100",
  "description": "Welcome discount",
  "discountType": "FLAT",
  "discountValue": 100,
  "maxDiscountAmount": null,
  "startDate": "2024-01-01",
  "endDate": "2025-12-31",
  "usageLimitPerUser": 1,
  "eligibility": {
    "allowedUserTiers": ["NEW"],
    "minLifetimeSpend": null,
    "minOrdersPlaced": null,
    "firstOrderOnly": true,
    "allowedCountries": ["IN", "US"],
    "minCartValue": 500,
    "applicableCategories": [],
    "excludedCategories": [],
    "minItemsCount": null
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Coupon created successfully",
  "coupon": { ... }
}
```

---

#### 3. Get All Coupons
**GET** `/api/coupons`

Returns all coupons in the system.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "coupons": [ ... ]
}
```

---

#### 4. Find Best Coupon
**POST** `/api/coupons/best`

Finds the best applicable coupon for a user and cart.

**Request Body:**
```json
{
  "userContext": {
    "userId": "u123",
    "userTier": "NEW",
    "country": "IN",
    "lifetimeSpend": 1200,
    "ordersPlaced": 0
  },
  "cart": {
    "items": [
      {
        "productId": "p1",
        "category": "electronics",
        "unitPrice": 1500,
        "quantity": 1
      }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "bestCoupon": {
    "code": "WELCOME100",
    "description": "Welcome discount",
    "discountType": "FLAT",
    "discountValue": 100,
    "calculatedDiscount": 100
  },
  "cartValue": 1500,
  "finalAmount": 1400,
  "savings": 100
}
```

---

#### 5. Demo Login
**POST** `/api/auth/login`

Login with demo credentials (required for submission).

**Request Body:**
```json
{
  "email": "hire-me@anshumat.org",
  "password": "HireMe@2025!"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "demo_user_123",
    "email": "hire-me@anshumat.org",
    "userTier": "GOLD",
    "country": "IN",
    "lifetimeSpend": 10000,
    "ordersPlaced": 5
  }
}
```

---

## 🔑 Demo Credentials

**Email:** `hire-me@anshumat.org`  
**Password:** `HireMe@2025!`

These credentials are hard-coded in the seed data as required.

---

## 🎯 Eligibility Logic

The system evaluates coupons based on:

### User-Based Criteria
- **allowedUserTiers**: NEW, REGULAR, GOLD
- **minLifetimeSpend**: Minimum historical spend
- **minOrdersPlaced**: Minimum past orders
- **firstOrderOnly**: Only valid for first order
- **allowedCountries**: Country restrictions

### Cart-Based Criteria
- **minCartValue**: Minimum cart total
- **applicableCategories**: Required product categories
- **excludedCategories**: Prohibited categories
- **minItemsCount**: Minimum number of items

---

## 🏆 Best Coupon Selection Logic

When multiple coupons are eligible:

1. **Highest discount amount** wins
2. If tied, **earliest end date** wins
3. If still tied, **lexicographically smaller code** wins

This ensures deterministic and optimal results.

---

## 🌟 Seed Data

The system comes pre-loaded with 3 sample coupons:

1. **WELCOME100** - ₹100 flat off for new users (first order, min cart ₹500)
2. **GOLD20** - 20% off for GOLD members (max ₹500, min cart ₹2000)
3. **ELECTRONICS15** - 15% off on electronics (max ₹1000, min cart ₹1000)

---

## 🤖 AI Usage Note

This project was developed with assistance from Claude (Anthropic's AI assistant). AI was used for:

### Prompts Used:
1. **Initial prompt:** "Build a coupon management system for e-commerce with Node.js/Express based on the provided assignment requirements"
2. **Architecture prompt:** "Design RESTful API endpoints for creating coupons and finding the best matching coupon with eligibility rules"
3. **Logic prompt:** "Implement deterministic best-coupon selection: highest discount → earliest end date → lexicographic code"
4. **Testing prompt:** "Create a test script to verify all API endpoints with sample data"
5. **Documentation prompt:** "Generate comprehensive README with setup instructions, API documentation, and examples"

### AI Assistance Areas:
- API endpoint structure and routing
- Eligibility validation logic
- Best coupon selection algorithm
- Error handling patterns
- Documentation and examples
- Test script creation

### Manual Work:
- Requirements analysis
- Business logic verification
- Testing and debugging
- Edge case handling
- Project organization

---

## 📁 Project Structure

```
coupon-management-api/
├── server.js          # Main API server
├── package.json       # Dependencies and scripts
├── test.js           # Test script
└── README.md         # This file
```

---

## 🚀 Deployment

### Deploy to Render.com (Recommended)

1. Push code to GitHub
2. Go to https://render.com
3. Create new "Web Service"
4. Connect your GitHub repo
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Click "Create Web Service"

Your API will be live at: `https://your-app-name.onrender.com`

### Deploy to Railway.app

1. Push code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Railway auto-detects Node.js and deploys

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Your API is deployed!

---

## 🐛 Troubleshooting

### Port already in use
If you see `EADDRINUSE` error:
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Tests failing
Make sure:
1. Server is running in another terminal
2. Server is on port 3000
3. No firewall blocking localhost

---

## 📝 Notes for Reviewer

- **In-memory storage** is used as specified (no database)
- **Seed data** includes demo login credentials as required
- **Deterministic selection** follows the specified rules strictly
- **All eligibility criteria** are implemented and tested
- **Edge cases** handled: expired coupons, usage limits, empty carts
- **Code quality**: Clean structure, clear naming, comprehensive comments

---



---

## 📄 License

MIT License - Free to use for educational purposes.

---

