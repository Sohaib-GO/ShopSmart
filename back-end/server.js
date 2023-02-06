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
// app.get("/api/items", (req, res) => {
//   db.query(`SELECT
//   items.name as item_name,
//   items.description,
//   items.price,
//   items.category,
//   items.image as item_image,
//   stores.name as store_name,
//   stores.address,
//   stores.image as store_logo
// FROM
//   items
//   JOIN stores ON items.store_id = stores.id
// `, (error, result) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// });

// // search items
// app.get("/api/items/search", (req, res) => {
//   const { name } = req.query;
//   db.query(`SELECT
//   items.name as item_name,
//   items.description,
//   items.price,
//   items.category,
//   items.image as item_image,
//   stores.name as store_name,
//   stores.address,
//   stores.image as store_logo
// FROM

//   items
//   JOIN stores ON items.store_id = stores.id
// WHERE
//   items.name LIKE $1
// `, [`%${name}%`], (error, result) => {

//     if (error) {
//       throw error;
//     }
//     res.status(200).json(result.rows);
//   });
// });
// view all items and all prices for different stores
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
