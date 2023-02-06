const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const port = 4000;
const db = require("./config/connectDB");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

// create a new user
app.post("/api/users", (req, res) => {
  const { name, email, password, address } = req.body;
  if (!name || !email || !password || !address) {
    return res.status(400).json({ error: "all fields are required" });
  }

  db.query(
    `INSERT INTO users (name, email, password, address) values ($1, $2, $3, $4)`,
    [name, email, password, address],
    (error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ success: true });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
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

app.post("/api/logout", (req, res) => {
  res.clearCookie("user");
  res.json({ message: "Logged out successfully." });
});

// create a new list
app.post("/api/lists", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  db.query(
    `INSERT INTO listings (name, user_id) values ($1, $2)`,
    [name, 2],
    (error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ success: true });
    }
  );
});

app.get("/api/items", (req, res) => {
  db.query(
    `SELECT
    items.name as item_name,
    items.description,
    items.price,
    items.category,
    items.image as item_image,
    stores.name as store_name,
    stores.address,
    stores.image as store_logo
  FROM
    items
    JOIN stores ON items.store_id = stores.id
  `,
    (error, result) => {
      if (error) {
        throw error;
      }
      const itemsData = {};
      result.rows.forEach((row) => {
        if (!itemsData[row.item_name]) {
          itemsData[row.item_name] = {
            description: row.description,
            category: row.category,
            item_image: row.item_image,
            stores: [],
          };
        }
        itemsData[row.item_name].stores.push({
          store_name: row.store_name,
          address: row.address,
          price: row.price,
          store_logo: row.store_logo,
        });
      });
      res.status(200).json(itemsData);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
