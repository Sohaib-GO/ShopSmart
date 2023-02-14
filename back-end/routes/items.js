const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get all items
  router.get("/", (req, res) => {
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
  router.post("/add-to-grocery-list", async (req, res) => {
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
      const storeQuery = await db.query(
        `SELECT id FROM stores WHERE name = $1`,
        [store_name]
      );
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

  return router;
};
