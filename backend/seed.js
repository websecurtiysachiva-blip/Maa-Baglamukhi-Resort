const db = require('./config/db');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('Starting database seed...');

    // Create users table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createTableQuery, (err) => {
      if (err) {
        console.log('Error creating table:', err);
        return;
      }

      console.log('✅ Users table created/exists');

      // Hash passwords
      const password1 = 'admin123';
      const password2 = 'user123';
      const password3 = 'manager123';

      Promise.all([
        bcrypt.hash(password1, 10),
        bcrypt.hash(password2, 10),
        bcrypt.hash(password3, 10)
      ]).then(([hash1, hash2, hash3]) => {
        // Test data
        const testUsers = [
          { name: 'Admin User', email: 'admin@hotel.com', password: hash1, role: 'Admin' },
          { name: 'John Doe', email: 'john@hotel.com', password: hash2, role: 'Admin' },
          { name: 'Manager', email: 'manager@hotel.com', password: hash3, role: 'Manager' }
        ];

        // Insert test users
        testUsers.forEach((user) => {
          const query = 'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
          db.query(query, [user.name, user.email, user.password, user.role], (err) => {
            if (err) {
              console.log('Error inserting user:', err);
            } else {
              console.log(`✅ User added: ${user.email}`);
            }
          });
        });

        console.log('\n🎉 Database seeding completed!');
        console.log('\n📝 Test Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Email: admin@hotel.com');
        console.log('Password: admin123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\nEmail: john@hotel.com');
        console.log('Password: user123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit();
      });
    });
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
