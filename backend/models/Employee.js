const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL Connected");

    // ✅ Default Admin Create
    db.query(
      "SELECT * FROM register WHERE email = ?",
      ["admin@gmail.com"],
      async (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        if (result.length === 0) {
          const hashedPassword = await bcrypt.hash("123456", 10);

          db.query(
            "INSERT INTO register (name,email,password,role) VALUES (?,?,?,?)",
            ["Admin", "admin@gmail.com", hashedPassword, "Admin"]
          );

          console.log("✅ Default Admin Created");
        }
      }
    );
  }
});


// ================= CREATE USER =================
const createEmployee = (data, callback) => {
  const sql =
    "INSERT INTO register (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [data.name, data.email, data.password, data.role], callback);
};


// ================= FIND USER =================
const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM register WHERE email = ?";
  db.query(sql, [email], callback);
};


// ================= GET ALL USERS =================
const getAllUsers = (callback) => {
  const sql = "SELECT id, name, email, role FROM register";
  db.query(sql, callback);
};

// ================= CHANGE PASSWORD =================
const changeUserPassword = (email, currentPassword, newPassword, callback) => {
  const findSql = "SELECT password FROM register WHERE email = ?";
  db.query(findSql, [email], async (err, result) => {
    if (err) return callback(err);

    if (result.length === 0) {
      return callback(new Error("User not found"));
    }

    const existingHash = result[0].password;
    const match = await bcrypt.compare(currentPassword, existingHash);

    if (!match) {
      return callback(new Error("Current password incorrect"));
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    const updateSql = "UPDATE register SET password = ? WHERE email = ?";
    db.query(updateSql, [newHash, email], callback);
  });
};


module.exports = {
  db,
  createEmployee,
  findUserByEmail,
  getAllUsers,
  changeUserPassword,
};