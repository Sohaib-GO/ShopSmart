import React, { useState, useEffect } from "react";

function Items() {
  const [items, setItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  const getCheapestStore = (stores) => {
    return stores.reduce((min, curr) => (curr.price < min.price ? curr : min));
  };

  const renderItem = (itemName) => {
    const { description, item_image, stores } = items[itemName];
    const cheapestStore = getCheapestStore(stores);
    return (
      <div key={itemName}>
        <h2>{itemName}</h2>
        <p>{description}</p>
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
