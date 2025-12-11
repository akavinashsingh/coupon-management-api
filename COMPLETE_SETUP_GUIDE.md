# 📦 Complete Setup Guide - Step by Step

This guide will walk you through setting up the Coupon Management API from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Running the Server](#running-the-server)
4. [Testing the API](#testing-the-api)
5. [Deployment](#deployment)
6. [Submission](#submission)

---

## 1. Prerequisites

### Check if Node.js is Installed

Open your terminal/command prompt and run:

```bash
node --version
```

You should see something like: `v18.0.0` or higher

If not installed:
- **Windows/Mac:** Download from https://nodejs.org/ (LTS version)
- **Mac (with Homebrew):** `brew install node`
- **Linux (Ubuntu):** `sudo apt install nodejs npm`

### Verify npm is Installed

```bash
npm --version
```

Should show version 8.0.0 or higher

---

## 2. Project Setup

### Option A: Clone from GitHub (if you have a repo)

```bash
git clone <your-repository-url>
cd coupon-management-api
npm install
```

### Option B: Manual Setup (from scratch)

#### Step 1: Create Project Directory

```bash
# Open terminal and create directory
mkdir coupon-management-api
cd coupon-management-api
```

#### Step 2: Create All Required Files

You need to create 6 files. Copy the content for each:

**File 1: package.json**
```json
{
  "name": "coupon-management-api",
  "version": "1.0.0",
  "description": "E-commerce Coupon Management System API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test.js"
  },
  "keywords": ["coupon", "ecommerce", "api", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**File 2: server.js**
(Copy the complete server.js code from the artifacts)

**File 3: test.js**
(Copy the complete test.js code from the artifacts)

**File 4: README.md**
(Copy the complete README.md from the artifacts)

**File 5: .gitignore**
```
node_modules/
package-lock.json
.env
.env.local
*.log
.DS_Store
```

**File 6: QUICKSTART.md** (optional)
(Copy the QUICKSTART.md from the artifacts)

#### Step 3: Install Dependencies

```bash
npm install
```

This will:
- Create a `node_modules` folder
- Install Express.js and CORS
- Install Nodemon (for development)
- Create `package-lock.json`

Wait for installation to complete (usually 30-60 seconds).

---

## 3. Running the Server

### Start the Server

```bash
npm start
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

✅ **Server is now running at: http://localhost:3000**

### Alternative: Development Mode (auto-restart)

```bash
npm run dev
```

This uses Nodemon to automatically restart when you change files.

### Stop the Server

Press `Ctrl + C` in the terminal

---

## 4. Testing the API

### Method 1: Using the Test Script (Recommended)

**IMPORTANT:** Keep the server running in one terminal!

Open a **NEW terminal window** and run:

```bash
cd coupon-management-api
npm test
```

This will run all API tests automatically and show results.

### Method 2: Using cURL (Command Line)

**Test 1: Health Check**
```bash
curl http://localhost:3000/
```

**Test 2: Get All Coupons**
```bash
curl http://localhost:3000/api/coupons
```

**Test 3: Create a Coupon**
```bash
curl -X POST http://localhost:3000/api/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "TEST50",
    "description": "Test coupon",
    "discountType": "FLAT",
    "discountValue": 50,
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

**Test 4: Find Best Coupon**
```bash
curl -X POST http://localhost:3000/api/coupons/best \
  -H "Content-Type: application/json" \
  -d '{
    "userContext": {
      "userId": "u123",
      "userTier": "NEW",
      "country": "IN",
      "lifetimeSpend": 0,
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

**Test 5: Demo Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hire-me@anshumat.org",
    "password": "HireMe@2025!"
  }'
```

### Method 3: Using Postman

1. **Download Postman:** https://www.postman.com/downloads/
2. **Import Collection:**
   - Open Postman
   - Click "Import"
   - Copy and paste the Postman collection JSON (provided in artifacts)
   - Click "Import"
3. **Test Endpoints:**
   - You'll see all endpoints in the collection
   - Click any endpoint and press "Send"
   - View responses

### Method 4: Using Browser (GET requests only)

Open browser and visit:
- http://localhost:3000/
- http://localhost:3000/api/coupons

---

## 5. Deployment

### Deploy to Render.com (FREE & Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Coupon Management API"

# Create GitHub repo and push
# (follow GitHub's instructions)
git remote add origin <your-repo-url>
git push -u origin main
```

#### Step 2: Deploy on Render

1. Go to https://render.com
2. Sign up/Login (use GitHub)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name:** `coupon-management-api` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Click **"Create Web Service"**
7. Wait 2-3 minutes for deployment

Your API will be live at: `https://your-app-name.onrender.com`

#### Step 3: Test Live API

```bash
curl https://your-app-name.onrender.com/
curl https://your-app-name.onrender.com/api/coupons
```

### Alternative: Deploy to Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository
6. Railway auto-detects Node.js and deploys
7. Get your live URL from dashboard

### Alternative: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Your API is deployed!
```

---

## 6. Submission

### Prepare Your Submission

1. **GitHub Repository:**
   - Make sure all files are pushed
   - Ensure README.md is complete
   - Add .gitignore to exclude node_modules

2. **Live Demo:**
   - Get your deployed URL (from Render/Railway/Vercel)
   - Test all endpoints on live URL
   - Verify demo login works

3. **Fill Submission Form:**

Go to: https://forms.gle/Bjmec4ajeJtc7697A

Submit:
```
Name: [Your Name]
GitHub Repo: https://github.com/yourusername/coupon-management-api
Live Demo Link: https://your-app-name.onrender.com
Tech Stack Used: Node.js, Express.js, In-memory Storage
Notes for Reviewer: 
- Demo credentials: hire-me@anshumat.org / HireMe@2025!
- All eligibility criteria implemented
- Deterministic best-coupon selection
- 3 seed coupons pre-loaded
- Comprehensive test script included
```

---

## 🎯 Verification Checklist

Before submission, verify:

- ✅ Server runs locally without errors
- ✅ All test cases pass (`npm test`)
- ✅ Demo login works (hire-me@anshumat.org)
- ✅ Can create new coupons
- ✅ Can find best coupon
- ✅ 3 seed coupons exist
- ✅ README.md is complete
- ✅ Code pushed to GitHub
- ✅ Deployed and live URL works
- ✅ All endpoints accessible on live URL

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 already in use

**Solution:**
```bash
# Mac/Linux - Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
PORT=3001 npm start
```

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Cannot find module 'express'

**Solution:**
```bash
# Make sure you're in correct directory
cd coupon-management-api

# Install dependencies
npm install
```

### Issue: Test script fails

**Solution:**
- Make sure server is running in another terminal
- Check server is on port 3000
- Try: `curl http://localhost:3000/`
- If needed, restart server

### Issue: Deployment fails on Render

**Solution:**
- Check Node version in package.json: `"node": ">=18.0.0"`
- Verify start command: `npm start`
- Check build logs on Render dashboard
- Ensure all dependencies are in package.json

---

## 📞 Need Help?

### For Setup Issues:
1. Check Node.js version: `node --version`
2. Check npm version: `npm --version`
3. Try deleting `node_modules` and reinstalling
4. Check if port 3000 is available

### For API Issues:
1. Check server is running
2. Look at server terminal for error messages
3. Verify request format matches examples
4. Check Content-Type header is `application/json`

### For Deployment Issues:
1. Check build logs on platform
2. Verify environment variables (if any)
3. Test locally first: `npm start`
4. Check Node version compatibility

---

## 🎉 Success!

If you've followed all steps:
- ✅ Server is running
- ✅ Tests pass
- ✅ Deployed online
- ✅ Ready for submission

**Congratulations!** Your Coupon Management System is complete!

---

## 📚 Additional Resources

- Node.js Documentation: https://nodejs.org/docs/
- Express.js Guide: https://expressjs.com/
- REST API Best Practices: https://restfulapi.net/
- Render Deployment: https://render.com/docs
- Railway Deployment: https://docs.railway.app/

---

**Assignment:** Coupon Management  
**Submission Form:** https://forms.gle/Bjmec4ajeJtc7697A

**Demo Credentials (Hard-coded):**
- Email: `hire-me@anshumat.org`
- Password: `HireMe@2025!`

Good luck! 🚀