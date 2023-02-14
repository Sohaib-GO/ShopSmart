import { useState, useEffect } from "react";
import axios from "axios";

 const useGroceryList = () => {
  const [groceries, setGroceries] = useState([]);


  useEffect(() => {
    fetch("/api/lists/fetch-grocery-list")
      .then((res) => res.json())
      .then((data) => setGroceries(data.data));
  }, []);

  const handleDeleteGroceryItem = async (item_name, store_name) => {
    try {
      const response = await axios.post("/api//delete-grocery-item", { item_name, store_name });
      if (response.data.success) {
        setGroceries(prevGroceryList =>
          prevGroceryList.filter(store => {
            store.items = store.items.filter(item => item.item_name !== item_name);
            return store.items.length > 0;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { groceries, handleDeleteGroceryItem };
};


export default useGroceryList;
