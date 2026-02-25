const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  db,
  createEmployee,
  findUserByEmail,
  getAllUsers,
  changeUserPassword,
} = require("./models/Employee");

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

// Multer storage for avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const safeEmail = (req.body.email || "user").replace(/[^a-zA-Z0-9]/g, "_");
    cb(null, `avatar_${safeEmail}${ext}`);
  },
});

const upload = multer({ storage });


// ================= CREATE USER =================
app.post("/api/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    createEmployee(
      { name, email, password: hashedPassword, role },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "User creation failed" });
        }

        res.json({ message: "User created successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= GET ALL USERS =================
app.get("/api/users", (req, res) => {
  getAllUsers((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching users" });
    }

    res.json(result);
  });
});


// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    res.json({
      token: "dummy-token",
      name: user.name,
      role: user.role,
      email: user.email,
    });
  });
});

// ================= CHANGE PASSWORD =================
app.post("/api/users/change-password", (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email, currentPassword aur newPassword required hain" });
  }

  changeUserPassword(email, currentPassword, newPassword, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: err.message || "Password change failed" });
    }

    res.json({ message: "Password changed successfully" });
  });
});

// ================= UPLOAD AVATAR (PROFILE PHOTO) =================
app.put("/api/users/me/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No avatar file uploaded" });
  }

  const avatarUrl = `/uploads/${req.file.filename}`;

  // Optional: yahan DB me avatarUrl save kar sakte hain (register table me avatar column ho to)

  res.json({ avatarUrl });
});


// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});