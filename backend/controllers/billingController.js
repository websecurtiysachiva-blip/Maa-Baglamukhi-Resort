const db = require('../config/db');

exports.createBill = (req, res) => {
  const { customer_name, amount, payment_status } = req.body;

  db.query(
    "INSERT INTO billing (customer_name, amount, payment_status, created_by) VALUES (?, ?, ?, ?)",
    [customer_name, amount, payment_status, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Bill Created Successfully" });
    }
  );
};

exports.getBills = (req, res) => {
  db.query("SELECT * FROM billing", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};