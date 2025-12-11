// Simple test script to verify API endpoints
const API_BASE = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('Test 1: Health Check');
    const healthRes = await fetch(`${API_BASE}/`);
    const healthData = await healthRes.json();
    console.log('✅ Health check passed');
    console.log('Response:', healthData);
    console.log('---\n');

    // Test 2: Get all coupons (should have seed data)
    console.log('Test 2: Get All Coupons');
    const couponsRes = await fetch(`${API_BASE}/api/coupons`);
    const couponsData = await couponsRes.json();
    console.log(`✅ Found ${couponsData.count} coupons`);
    console.log('Coupons:', couponsData.coupons.map(c => c.code));
    console.log('---\n');

    // Test 3: Create a new coupon
    console.log('Test 3: Create New Coupon');
    const newCoupon = {
      code: 'TESTSAVE50',
      description: 'Test coupon - 50 rupees off',
      discountType: 'FLAT',
      discountValue: 50,
      maxDiscountAmount: null,
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      usageLimitPerUser: 1,
      eligibility: {
        allowedUserTiers: [],
        minLifetimeSpend: null,
        minOrdersPlaced: null,
        firstOrderOnly: false,
        allowedCountries: [],
        minCartValue: 500,
        applicableCategories: [],
        excludedCategories: [],
        minItemsCount: null
      }
    };

    const createRes = await fetch(`${API_BASE}/api/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon)
    });
    const createData = await createRes.json();
    console.log('✅ Coupon created:', createData.coupon?.code);
    console.log('---\n');

    // Test 4: Find best coupon for NEW user
    console.log('Test 4: Find Best Coupon for NEW user (first order)');
    const newUserRequest = {
      userContext: {
        userId: 'test_user_new',
        userTier: 'NEW',
        country: 'IN',
        lifetimeSpend: 0,
        ordersPlaced: 0
      },
      cart: {
        items: [
          { productId: 'p1', category: 'electronics', unitPrice: 1500, quantity: 1 },
          { productId: 'p2', category: 'fashion', unitPrice: 500, quantity: 1 }
        ]
      }
    };

    const newUserRes = await fetch(`${API_BASE}/api/coupons/best`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserRequest)
    });
    const newUserData = await newUserRes.json();
    console.log('✅ Best coupon found:', newUserData.bestCoupon?.code);
    console.log('Cart Value:', newUserData.cartValue);
    console.log('Discount:', newUserData.savings);
    console.log('Final Amount:', newUserData.finalAmount);
    console.log('---\n');

    // Test 5: Find best coupon for GOLD user
    console.log('Test 5: Find Best Coupon for GOLD user');
    const goldUserRequest = {
      userContext: {
        userId: 'demo_user_123',
        userTier: 'GOLD',
        country: 'IN',
        lifetimeSpend: 10000,
        ordersPlaced: 5
      },
      cart: {
        items: [
          { productId: 'p1', category: 'electronics', unitPrice: 3000, quantity: 2 }
        ]
      }
    };

    const goldUserRes = await fetch(`${API_BASE}/api/coupons/best`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goldUserRequest)
    });
    const goldUserData = await goldUserRes.json();
    console.log('✅ Best coupon found:', goldUserData.bestCoupon?.code);
    console.log('Cart Value:', goldUserData.cartValue);
    console.log('Discount:', goldUserData.savings);
    console.log('Final Amount:', goldUserData.finalAmount);
    console.log('---\n');

    // Test 6: Test login
    console.log('Test 6: Demo Login');
    const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'hire-me@anshumat.org',
        password: 'HireMe@2025!'
      })
    });
    const loginData = await loginRes.json();
    console.log('✅ Login successful:', loginData.user?.email);
    console.log('User details:', loginData.user);
    console.log('---\n');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();