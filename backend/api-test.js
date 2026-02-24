const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🔐 Testing login endpoint...\n');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@hotel.com',
      password: 'admin123'
    });

    console.log('✅ LOGIN SUCCESS!');
    console.log('Response:', response.data);
    process.exit();
  } catch (error) {
    console.log('❌ LOGIN FAILED!');
    console.log('Error:', error.response?.data || error.message);
    process.exit();
  }
};

testLogin();
