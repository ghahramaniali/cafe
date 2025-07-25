const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  first_name: 'Test',
  last_name: 'User'
};

let authToken = '';
let adminToken = '';

async function testAPI() {
  console.log('🧪 Testing Cafe API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', health.data.status);

    // Test admin login
    console.log('\n2. Testing admin login...');
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@cafe.com',
      password: 'admin123'
    });
    adminToken = adminLogin.data.token;
    console.log('✅ Admin login successful');

    // Test user registration
    console.log('\n3. Testing user registration...');
    const register = await axios.post(`${BASE_URL}/auth/register`, testUser);
    authToken = register.data.token;
    console.log('✅ User registration successful');

    // Test get categories
    console.log('\n4. Testing get categories...');
    const categories = await axios.get(`${BASE_URL}/categories`);
    console.log(`✅ Found ${categories.data.length} categories`);

    // Test get products
    console.log('\n5. Testing get products...');
    const products = await axios.get(`${BASE_URL}/products`);
    console.log(`✅ Found ${products.data.length} products`);

    // Test create product (admin only)
    if (categories.data.length > 0) {
      console.log('\n6. Testing create product...');
      const newProduct = {
        name: 'Test Coffee',
        name_fa: 'قهوه تست',
        category_id: categories.data[0].id,
        price: 4.50,
        description: 'Test coffee product',
        description_fa: 'محصول قهوه تست',
        is_available: true,
        is_featured: false
      };

      const createProduct = await axios.post(`${BASE_URL}/products`, newProduct, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log('✅ Product created successfully');

      // Test create review
      console.log('\n7. Testing create review...');
      const newReview = {
        product_id: createProduct.data.id,
        rating: 5,
        comment: 'Great test product!',
        comment_fa: 'محصول تست عالی!'
      };

      const createReview = await axios.post(`${BASE_URL}/reviews`, newReview, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('✅ Review created successfully');

      // Test get reviews for product
      console.log('\n8. Testing get product reviews...');
      const productReviews = await axios.get(`${BASE_URL}/reviews/product/${createProduct.data.id}`);
      console.log(`✅ Found ${productReviews.data.length} reviews for product`);

      // Test search products
      console.log('\n9. Testing product search...');
      const searchResults = await axios.get(`${BASE_URL}/products/search/coffee`);
      console.log(`✅ Found ${searchResults.data.length} products matching "coffee"`);

    }

    // Test get user profile
    console.log('\n10. Testing get user profile...');
    const profile = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ User profile retrieved:', profile.data.user.username);

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\nAPI is ready for use! 🚀');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running: npm run dev');
    }
  }
}

// Check if axios is available
try {
  require.resolve('axios');
  testAPI();
} catch (error) {
  console.log('❌ Axios not found. Install it first:');
  console.log('npm install axios');
  console.log('\nThen run: node test-api.js');
} 