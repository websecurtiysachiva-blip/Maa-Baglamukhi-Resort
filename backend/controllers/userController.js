const db = require('../config/db');

// GET all users
exports.getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE user
exports.createUser = (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User created successfully" });
    }
  );
};

// DELETE user
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User deleted successfully" });
    }
  );
};