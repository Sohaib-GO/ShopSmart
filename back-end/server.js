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
  const user_id = req.cookies.user;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  db.query(
    `INSERT INTO listings (name, user_id) values ($1, $2)`,
    [name, user_id],
    (error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ success: true });
    }
  );
});

// get all lists
app.get("/api/lists", (req, res) => {
  const user_id = req.cookies.user;
  db.query(
    `SELECT * FROM listings WHERE user_id = $1`,
    [user_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
});

app.get("/api/items", (req, res) => {
  db.query(
    `SELECT
    items.name as item_name,
    items.id as item_id,
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
            id: row.item_id,
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

// add an item to the grocery list
app.post("/api/add-to-grocery-list", async (req, res) => {
  const { item_name, store_name, price } = req.body;
  const user_id = req.cookies.user;
  const date = new Date();
  // Check if the user is logged in
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Please log in to add items to your grocery list",
    });
  }

  try {
    // Get the item_id and store_id from the `items` and `stores` tables
    const itemQuery = await db.query(`SELECT id FROM items WHERE name = $1`, [
      item_name,
    ]);
    const storeQuery = await db.query(`SELECT id FROM stores WHERE name = $1`, [
      store_name,
    ]);
    const item_id = itemQuery.rows[0].id;
    const store_id = storeQuery.rows[0].id;

    // Check if the item is already in the user's grocery list
    const checkQuery = await db.query(
      `SELECT * FROM grocery_lists WHERE item_id = $1 AND user_id = $2`,
      [item_id, user_id]
    );
    if (checkQuery.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Item is already in your grocery list",
      });
    }

    // Add the item to the user's grocery list
    const addQuery = await db.query(
      `INSERT INTO grocery_lists (user_id ,item_id, store_id, price, date_added) VALUES ($1, $2, $3, $4, $5)`,
      [user_id, item_id, store_id, price, date]
    );

    res.status(201).json({
      success: true,
      message: "Item added to your grocery list",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// get grocery list
app.get("/api/fetch-grocery-list", async (req, res) => {
  const user_id = req.cookies.user;

  // Check if the user is logged in
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Please log in to view your grocery list",
    });
  }

  try {
    // Get the item name, price, store name, and store id from the `grocery_lists`, `items`, and `stores` tables
    const groceryListQuery = await db.query(
      `SELECT items.name AS item_name, grocery_lists.price AS item_price, stores.name AS store_name, stores.id AS store_id
       FROM grocery_lists
       INNER JOIN items ON grocery_lists.item_id = items.id
       INNER JOIN stores ON grocery_lists.store_id = stores.id
       WHERE grocery_lists.user_id = $1`,
      [user_id]
    );

    // Group the items by store name
    const groupedGroceryList = groceryListQuery.rows.reduce((acc, curr) => {
      const storeIndex = acc.findIndex(
        (store) => store.store_id === curr.store_id
      );
      // If the store is not in the grouped list, add it
      if (storeIndex === -1) {
        acc.push({
          store_name: curr.store_name,
          store_id: curr.store_id,
          items: [
            {
              item_name: curr.item_name,
              item_price: curr.item_price,
            },
          ],
        });
        // If the store is in the grouped list, add the item to the store's items list
      } else {
        acc[storeIndex].items.push({
          item_name: curr.item_name,
          item_price: curr.item_price,
        });
      }
      return acc;
    }, []);

    res.status(200).json({
      success: true,
      message: "Grocery list fetched successfully",
      data: groupedGroceryList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// delete an item from the grocery list
app.post("/api/delete-grocery-item", (req, res) => {
  const { item_name, store_name } = req.body;
  const user_id = req.cookies.user;

  // Check if the user is logged in
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "Please log in to delete items from your grocery list",
    });
  }

  db.query(
    `DELETE FROM grocery_lists
     USING items, stores
     WHERE grocery_lists.user_id = $1 
     AND grocery_lists.item_id = items.id
     AND items.name = $2
     AND grocery_lists.store_id = stores.id
     AND stores.name = $3`,
    [user_id, item_name, store_name],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Server error",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Item deleted from your grocery list",
        });
      }
    }
  );
});



app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});

