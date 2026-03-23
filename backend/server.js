require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const https = require("https");
const fs = require("fs");

const app = express();

app.use(cors({
  origin: "https://omnitaas-login-app-hrk.vercel.app"
}));
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

/*
Simulated database user
Password is hashed using bcrypt
*/
const users = [
  {
    username: process.env.ADMIN_USERNAME,
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
  }
];

/*
Rate limiter to prevent brute-force attacks
*/
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many login attempts. Try again later."
  }
});

/*
Login API
*/
app.post("/login", loginLimiter, async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  try {

    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    return res.status(200).json({
      message: "Login successful",
      username: username
    });

  } catch (error) {

    return res.status(500).json({
      message: "Server error"
    });

  }

});

app.listen(PORT, () => {
  console.log(`Secure server running on port ${PORT}`);
});

// -------------------------------
// HTTPS Configuration
// -------------------------------

const httpsOptions = {
  key: fs.existsSync("./ssl/key.pem") ? fs.readFileSync("./ssl/key.pem") : null,
  cert: fs.existsSync("./ssl/cert.pem") ? fs.readFileSync("./ssl/cert.pem") : null
};

// Start HTTPS server if certificates exist
if (httpsOptions.key && httpsOptions.cert) {

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`🔐 HTTPS Server running on https://localhost:${PORT}`);
  });

} else {
  // fallback to HTTP
  app.listen(PORT, () => {
    console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
  });

}
