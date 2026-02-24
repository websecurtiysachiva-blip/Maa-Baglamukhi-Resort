const db = require('./config/db');
const bcrypt = require('bcryptjs');

const email = 'admin@hotel.com';
const testPassword = 'admin123';

db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
  if (err) {
    console.log('❌ Query error:', err);
    process.exit();
  }

  if (result.length === 0) {
    console.log(`❌ User not found: ${email}`);
    process.exit();
  }

  const user = result[0];
  console.log('✅ User found:', user.email);
  console.log('🔒 Stored hash:', user.password);
  console.log('🔑 Testing password:', testPassword);

  const validPass = await bcrypt.compare(testPassword, user.password);
  
  console.log('\n' + (validPass ? '✅ PASSWORD MATCHES!' : '❌ PASSWORD MISMATCH'));
  console.log('Result:', validPass);
  
  process.exit();
});
