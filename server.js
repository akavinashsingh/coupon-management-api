const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let coupons = [];
let usageHistory = {}; // Format: { "userId_couponCode": count }

// Seed data with demo user credentials
const demoUser = {
  email: 'hire-me@anshumat.org',
  password: 'HireMe@2025!',
  userId: 'demo_user_123',
  userTier: 'GOLD',
  country: 'IN',
  lifetimeSpend: 10000,
  ordersPlaced: 5
};

// Seed some sample coupons
const seedCoupons = [
  {
    code: 'WELCOME100',
    description: 'Welcome discount for new users',
    discountType: 'FLAT',
    discountValue: 100,
    maxDiscountAmount: null,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    usageLimitPerUser: 1,
    eligibility: {
      allowedUserTiers: ['NEW'],
      minLifetimeSpend: null,
      minOrdersPlaced: null,
      firstOrderOnly: true,
      allowedCountries: ['IN', 'US'],
      minCartValue: 500,
      applicableCategories: [],
      excludedCategories: [],
      minItemsCount: null
    }
  },
  {
    code: 'GOLD20',
    description: '20% off for GOLD members',
    discountType: 'PERCENT',
    discountValue: 20,
    maxDiscountAmount: 500,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    usageLimitPerUser: null,
    eligibility: {
      allowedUserTiers: ['GOLD'],
      minLifetimeSpend: 5000,
      minOrdersPlaced: 3,
      firstOrderOnly: false,
      allowedCountries: ['IN'],
      minCartValue: 2000,
      applicableCategories: [],
      excludedCategories: [],
      minItemsCount: null
    }
  },
  {
    code: 'ELECTRONICS15',
    description: '15% off on electronics',
    discountType: 'PERCENT',
    discountValue: 15,
    maxDiscountAmount: 1000,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    usageLimitPerUser: null,
    eligibility: {
      allowedUserTiers: [],
      minLifetimeSpend: null,
      minOrdersPlaced: null,
      firstOrderOnly: false,
      allowedCountries: [],
      minCartValue: 1000,
      applicableCategories: ['electronics'],
      excludedCategories: [],
      minItemsCount: null
    }
  }
];

coupons = [...seedCoupons];

// Helper function to validate coupon eligibility
function isCouponEligible(coupon, userContext, cart) {
  const now = new Date();
  const startDate = new Date(coupon.startDate);
  const endDate = new Date(coupon.endDate);
  
  // Check date validity
  if (now < startDate || now > endDate) {
    return false;
  }
  
  // Check usage limit
  const usageKey = `${userContext.userId}_${coupon.code}`;
  const currentUsage = usageHistory[usageKey] || 0;
  if (coupon.usageLimitPerUser !== null && currentUsage >= coupon.usageLimitPerUser) {
    return false;
  }
  
  const e = coupon.eligibility;
  
  // User-based checks
  if (e.allowedUserTiers && e.allowedUserTiers.length > 0) {
    if (!e.allowedUserTiers.includes(userContext.userTier)) {
      return false;
    }
  }
  
  if (e.minLifetimeSpend !== null && userContext.lifetimeSpend < e.minLifetimeSpend) {
    return false;
  }
  
  if (e.minOrdersPlaced !== null && userContext.ordersPlaced < e.minOrdersPlaced) {
    return false;
  }
  
  if (e.firstOrderOnly === true && userContext.ordersPlaced > 0) {
    return false;
  }
  
  if (e.allowedCountries && e.allowedCountries.length > 0) {
    if (!e.allowedCountries.includes(userContext.country)) {
      return false;
    }
  }
  
  // Cart-based checks
  const cartValue = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(cart.items.map(item => item.category))];
  
  if (e.minCartValue !== null && cartValue < e.minCartValue) {
    return false;
  }
  
  if (e.minItemsCount !== null && totalItems < e.minItemsCount) {
    return false;
  }
  
  if (e.applicableCategories && e.applicableCategories.length > 0) {
    const hasApplicable = e.applicableCategories.some(cat => categories.includes(cat));
    if (!hasApplicable) {
      return false;
    }
  }
  
  if (e.excludedCategories && e.excludedCategories.length > 0) {
    const hasExcluded = e.excludedCategories.some(cat => categories.includes(cat));
    if (hasExcluded) {
      return false;
    }
  }
  
  return true;
}

// Helper function to calculate discount
function calculateDiscount(coupon, cartValue) {
  if (coupon.discountType === 'FLAT') {
    return coupon.discountValue;
  } else {
    let discount = (cartValue * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount !== null) {
      discount = Math.min(discount, coupon.maxDiscountAmount);
    }
    return discount;
  }
}

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Coupon Management API',
    version: '1.0.0',
    endpoints: {
      'POST /api/coupons': 'Create a new coupon',
      'GET /api/coupons': 'Get all coupons',
      'POST /api/coupons/best': 'Find best coupon for user and cart',
      'POST /api/auth/login': 'Login with demo credentials'
    }
  });
});

// Login endpoint (for demo)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === demoUser.email && password === demoUser.password) {
    res.json({
      success: true,
      user: {
        userId: demoUser.userId,
        email: demoUser.email,
        userTier: demoUser.userTier,
        country: demoUser.country,
        lifetimeSpend: demoUser.lifetimeSpend,
        ordersPlaced: demoUser.ordersPlaced
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

// Create coupon
app.post('/api/coupons', (req, res) => {
  try {
    const coupon = req.body;
    
    // Validation
    if (!coupon.code || !coupon.description || !coupon.discountValue) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, description, discountValue'
      });
    }
    
    // Check for duplicate code
    if (coupons.find(c => c.code === coupon.code)) {
      return res.status(400).json({
        success: false,
        error: 'Coupon code already exists'
      });
    }
    
    // Add coupon
    coupons.push(coupon);
    
    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all coupons
app.get('/api/coupons', (req, res) => {
  res.json({
    success: true,
    count: coupons.length,
    coupons: coupons
  });
});

// Find best coupon
app.post('/api/coupons/best', (req, res) => {
  try {
    const { userContext, cart } = req.body;
    
    // Validation
    if (!userContext || !cart) {
      return res.status(400).json({
        success: false,
        error: 'Missing userContext or cart'
      });
    }
    
    if (!cart.items || !Array.isArray(cart.items)) {
      return res.status(400).json({
        success: false,
        error: 'Cart must contain items array'
      });
    }
    
    // Calculate cart value
    const cartValue = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    
    // Filter eligible coupons
    const eligibleCoupons = coupons.filter(coupon => isCouponEligible(coupon, userContext, cart));
    
    if (eligibleCoupons.length === 0) {
      return res.json({
        success: true,
        bestCoupon: null,
        message: 'No eligible coupons found'
      });
    }
    
    // Calculate discount for each eligible coupon
    const couponsWithDiscount = eligibleCoupons.map(coupon => ({
      ...coupon,
      calculatedDiscount: calculateDiscount(coupon, cartValue)
    }));
    
    // Sort by discount (desc), then endDate (asc), then code (asc)
    couponsWithDiscount.sort((a, b) => {
      if (b.calculatedDiscount !== a.calculatedDiscount) {
        return b.calculatedDiscount - a.calculatedDiscount;
      }
      const dateCompare = new Date(a.endDate) - new Date(b.endDate);
      if (dateCompare !== 0) return dateCompare;
      return a.code.localeCompare(b.code);
    });
    
    const bestCoupon = couponsWithDiscount[0];
    
    // Update usage history (optional - only if you want to track usage)
    // const usageKey = `${userContext.userId}_${bestCoupon.code}`;
    // usageHistory[usageKey] = (usageHistory[usageKey] || 0) + 1;
    
    res.json({
      success: true,
      bestCoupon: bestCoupon,
      cartValue: cartValue,
      finalAmount: cartValue - bestCoupon.calculatedDiscount,
      savings: bestCoupon.calculatedDiscount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Reset usage history (for testing)
app.post('/api/coupons/reset-usage', (req, res) => {
  usageHistory = {};
  res.json({
    success: true,
    message: 'Usage history reset successfully'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   Coupon Management API Server Started    ║
  ╠═══════════════════════════════════════════╣
  ║   Port: ${PORT}                           
  ║   Status: Running                          ║
  ║                                            ║
  ║   Demo Credentials:                        ║
  ║   Email: hire-me@anshumat.org             ║
  ║   Password: HireMe@2025!                   ║
  ╚═══════════════════════════════════════════╝
  `);
});