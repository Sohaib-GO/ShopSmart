const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { name, email, password, address, lat, lng } = req.body;
    if (!name || !email || !password || !address || !lat || !lng) {
      return res.status(400).json({ error: "all fields are required" });
    }

    db.query(
      `INSERT INTO users (name, email, password, address, lat, lng) VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, password, address, lat, lng],

      (error) => {
        if (error) {
          return res.status(500).json({ error });
        }
        res.status(201).json({ success: true });
      }
    );
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    db.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      [email, password],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error });
        }
        if (result.rows.length === 0) {
          return res.status(401).json({ error: "Invalid email or password." });
        }
        const user = result.rows[0];
        res.cookie("user", user.id, { maxAge: 60 * 60 * 1000 });
        res.json(user);
      }
    );
  });

  // get current user
  router.get("/current-user", (req, res) => {
    const user_id = req.cookies.user;
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    db.query(
      `SELECT * FROM users WHERE id = $1`,
      [user_id],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error });
        }

        const user = result.rows[0];
        res.json(user);
      }
    );
  });

  router.post('logout', (req, res) => {
    res.clearCookie("user");
    res.json({ message: "Logged out successfully." });
  });
  

  return router;
};
