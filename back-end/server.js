const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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

// show all items
app.get("/api/items", (req, res) => {
  db.query("SELECT * FROM items", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});






app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
