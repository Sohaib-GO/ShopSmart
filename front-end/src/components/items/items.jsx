import React, { useState, useEffect, useContext } from "react";
function Items(props) {
  const [items, setItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  const { isLoggedIn } = props;
  console.log(isLoggedIn);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  const getCheapestStore = (stores) => {
    return stores.reduce((min, curr) => (curr.price < min.price ? curr : min));
  };

    // add the item with the cheapest price to a new array, also add the store name and item name

    const handleAddToGroceryList = async (itemName) => {
      if (!isLoggedIn) {
        alert("Please login to add items to your grocery list");
        return;
      }
    
      const { stores } = items[itemName];
      const cheapestStore = getCheapestStore(stores);
      const { store_name, price } = cheapestStore;
    
      try {
        const response = await fetch('/api/add-to-grocery-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item_name: itemName, store_name, price }),
        });
        const result = await response.json();
    
        if (!result.success) {
          throw new Error(result.message);
        }
    
        const newItem = {
          itemName,
          store_name,
          price,
        };
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
          console.log(addedItems);
  
  const renderItem = (itemName) => {
    const { description, item_image, stores, id } = items[itemName];
    const cheapestStore = getCheapestStore(stores);
    return (
      <div key={itemName}>
        <h2>{itemName}</h2>
        <h3>{id}</h3>
        <p>{description}</p>
        <button onClick={() => handleAddToGroceryList(itemName)}> Add to Grocery List</button>
        <img src={item_image} alt={itemName} style={{ width: 70 }} />
        <ul>
          {stores.map((store) => {
            const { store_name, price, store_logo } = store;
            const isCheapest = cheapestStore.store_name === store_name;
            return (
              <div key={store_name} style={{ color: isCheapest ? "red" : "" }}>
                <img src={store_logo} alt={store_name} style={{ width: 70 }} />
                ${price}
                {isCheapest && " (cheapest)"}
              </div>
            );
          })}
        </ul>
      </div>
    );
  };



  
  const filteredItems = Object.keys(items).filter((itemName) =>
    itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredItems.map((itemName) => renderItem(itemName))}
    </div>
  );
}

export default Items;
