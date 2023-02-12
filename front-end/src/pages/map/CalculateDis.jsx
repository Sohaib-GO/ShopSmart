import React, { useState, useEffect } from "react";

import useLogin from "../../components/authentication/useLogin";
import useGroceryList from "../listings/useListingsHook";

const DistanceTime = (props) => {
  const [storeDistances, setStoreDistances] = useState([]);
  const [transportationMode, setTransportationMode] = useState("driving");
  const { user } = useLogin(props);
  const { groceries } = useGroceryList(props);

  useEffect(() => {
    const userAddress = user.address;
    const storeAddresses = groceries.map((grocery) => {
      return grocery.store_address;
    });
    const storeNames = groceries.map((grocery) => {
      return grocery.store_name;
    });

    Promise.all(
      storeAddresses.map((storeAddress, index) => {
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
  }, [user, groceries, transportationMode]);

  const handleTransportationModeChange = (event) => {
    setTransportationMode(event.target.value);
  };

  return (
    <div>
      <label>
        Mode of transportation:
        <select value={transportationMode} onChange={handleTransportationModeChange}>
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
          <option value="bicycling">Bicycling</option>
          <option value="transit">Transit</option>
        </select>
      </label>
      <ul>
        {storeDistances.length > 0 &&
          storeDistances.map((storeDistance) => (
            <li key={storeDistance.name}>
              {storeDistance.name}: {storeDistance.distance}, {storeDistance.duration}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DistanceTime;
