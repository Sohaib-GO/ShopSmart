import React, { useState, useEffect } from "react";

import useLogin from "../../components/authentication/useLogin";
import useGroceryList from "../listings/useListingsHook";

const DistanceTime = (props) => {
  const [storeDistances, setStoreDistances] = useState([]);
  const [transportationMode, setTransportationMode] = useState("driving");
  const { user, isLoggedIn } = useLogin(props);
  const { groceries } = useGroceryList(props);
  const { selectedStore } = props;

  useEffect(() => {
    if (isLoggedIn) {
      const userAddress = user.address;
      let storeAddresses = [];
      let storeNames = [];
      if (selectedStore) {
        storeAddresses = [selectedStore.store_address];
        storeNames = [selectedStore.store_name];
      } else {
        storeAddresses = groceries?.map((grocery) => {
          return grocery.store_address;
        });
        storeNames = groceries?.map((grocery) => {
          return grocery.store_name;
        });
      }

      Promise.all(
        storeAddresses?.map((storeAddress, index) => {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${userAddress}&destinations=${storeAddress}&mode=${transportationMode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
          return fetch(url)
            .then((res) => res.json())
            .then((data) => {
              return {
                name: storeNames[index],
                distance: data.rows[0].elements[0].distance.text,
                duration: data.rows[0].elements[0].duration.text,
              };
            });
        })
      )
        .then((storeDistances) => {
          setStoreDistances(storeDistances);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, groceries, transportationMode, selectedStore, isLoggedIn]);

  return (
    <div>
      <label>
        Mode of transportation:
        <select
          value={transportationMode}
          onChange={(e) => setTransportationMode(e.target.value)}
        >
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
          <option value="bicycling">Bicycling</option>
          <option value="transit">Transit</option>
        </select>
      </label>
      <ul>
        {isLoggedIn ? (
          storeDistances.length > 0 ? (
            storeDistances.map((storeDistance) => (
              <li key={storeDistance.name}>
                {storeDistance.name}: {storeDistance.distance},{" "}
                {storeDistance.duration}
              </li>
            ))
          ) : (
            <li>No stores added yet</li>
          )
        ) : (
          <li>
            You need to be logged in to see the distances and duration of your
            stores
          </li>
        )}
      </ul>
    </div>
  );
};

export default DistanceTime;