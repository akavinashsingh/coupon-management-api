# ⚡ Quick Start Guide

Get the API running in under 2 minutes!

---

## 🎯 Prerequisites Check

Open terminal and verify Node.js:
```bash
node --version
# Should show v18.0.0 or higher
```

If not installed → Download from https://nodejs.org/

---

## 🚀 Setup Steps

### 1️⃣ Create Project Directory
```bash
mkdir coupon-management-api
cd coupon-management-api
```

### 2️⃣ Create Files

Create these 5 files in the directory:

**package.json** (copy from artifacts)
**server.js** (copy from artifacts)
**test.js** (copy from artifacts)
**README.md** (copy from artifacts)
**.gitignore** (copy from artifacts)

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Start Server
```bash
npm start
```

✅ **Server running at:** http://localhost:3000

---

## 🧪 Test It!

### Open a NEW terminal (keep server running) and test:

```bash
# Test 1: Health check
curl http://localhost:3000/

# Test 2: Get all coupons
curl http://localhost:3000/api/coupons

# Test 3: Run full test suite
npm test
```

---

## 🌐 Access the API

**Base URL:** http://localhost:3000

**Demo Login:**
- Email: `hire-me@anshumat.org`
- Password: `HireMe@2025!`

---

## 📋 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/coupons` | Get all coupons |
| POST | `/api/coupons` | Create new coupon |
| POST | `/api/coupons/best` | Find best coupon |
| POST | `/api/auth/login` | Demo login |

---

## 🎯 Example: Find Best Coupon

**Request:**
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

**Response:**
```json
{
  "success": true,
  "bestCoupon": {
    "code": "WELCOME100",
    "description": "Welcome discount for new users",
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

## 🚀 Deploy to Cloud

### Render.com (Free & Easy):
1. Push code to GitHub
2. Go to https://render.com
3. New Web Service → Connect GitHub
4. Build: `npm install`
5. Start: `npm start`
6. Deploy!

### Railway.app:
1. Push to GitHub
2. Go to https://railway.app
3. New Project → Deploy from GitHub
4. Select repo → Auto-deploys!

---

## 🐛 Common Issues

**Port in use?**
```bash
# Use different port
PORT=3001 npm start
```

**Can't install dependencies?**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Test failing?**
- Make sure server is running first
- Check it's on port 3000
- Try: `curl http://localhost:3000/`

---

## 📚 Need More Info?

See **README.md** for:
- Complete API documentation
- Detailed setup instructions
- Deployment guides
- Troubleshooting

---

## ✅ You're Done!

Your coupon management API is ready for:
- ✅ Testing
- ✅ Development  
- ✅ Deployment
- ✅ Submission

**Next Step:** Test all endpoints with Postman or the test script!

---

**Assignment:** Coupon Management  
**Submission:** [forms.gle/Bjmec4ajeJtc7697A](https://forms.gle/Bjmec4ajeJtc7697A)