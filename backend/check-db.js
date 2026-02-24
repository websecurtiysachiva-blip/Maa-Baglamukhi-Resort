const db = require('./config/db');

db.query("SELECT * FROM users", (err, results) => {
  if (err) {
    console.log('❌ Error:', err);
  } else {
    console.log('📊 Users in database:');
    console.log(results);
  }
  
  // Also check table structure
  db.query("DESC users", (err, columns) => {
    if (err) {
      console.log('❌ Error checking table:', err);
    } else {
      console.log('\n📋 Table structure:');
      console.log(columns);
    }
    process.exit();
  });
});
