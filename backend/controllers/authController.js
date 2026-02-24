const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
  
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const user = result[0];
  
      const validPass = await bcrypt.compare(password, user.password);
  
      if (!validPass) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({
        token,
        role: user.role,
        name: user.name
      });
    });
  };

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role || "Admin"],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error creating user" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};