const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get grocery list
  router.get("/fetch-grocery-list", async (req, res) => {
    const user_id = req.cookies.user;

    // Check if the user is logged in
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Please log in to view your grocery list",
      });
    }

    try {
      const groceryListQuery = await db.query(
        `SELECT items.name AS item_name, items.image as item_image, grocery_lists.price AS item_price, stores.name AS store_name, stores.id AS store_id, stores.lat AS store_lat, stores.lng AS store_lng, stores.address AS store_address, stores.image AS store_image
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
            store_lat: curr.store_lat,
            store_lng: curr.store_lng,
            store_image: curr.store_image,
            store_address: curr.store_address,
            items: [
              {
                item_name: curr.item_name,
                item_price: curr.item_price,
                item_image: curr.item_image,
              },
            ],
          });
          // If the store is in the grouped list, add the item to the store's items list
        } else {
          acc[storeIndex].items.push({
            item_name: curr.item_name,
            item_price: curr.item_price,
            item_image: curr.item_image,
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
  router.post("/delete-grocery-item", (req, res) => {
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

  return router;
};
