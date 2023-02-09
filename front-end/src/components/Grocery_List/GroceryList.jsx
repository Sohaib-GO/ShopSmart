import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchGroceryList = (props) => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = props;

  useEffect(() => {
    const fetchGroceries = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/fetch-grocery-list");
        setGroceries(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchGroceries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Please log in to view your grocery list</div>;
  }


  const handleDeleteGroceryItem = async (item_name, store_name) => {
    try {
      const response = await axios.post("/api/delete-grocery-item", { item_name, store_name });
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
    


  return (
    <div>
      {groceries.length === 0 ? <div>Your grocery list is empty</div> :
        groceries.map((store) => (
          <div key={store.store_id}>
            <h3>{store.store_name}</h3>
            <div>
              {store.items.map((item) => (
                <div key={item.item_name}>
                  {item.item_name} (${item.item_price})
                  <button
                    onClick={() => handleDeleteGroceryItem(item.item_name, store.store_name)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
  };

export default FetchGroceryList;
