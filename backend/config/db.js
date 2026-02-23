const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   // XAMPP default blank hota hai
  database: 'hotel_db'
});

db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('MySQL Connected Successfully');
  }
});

module.exports = db;