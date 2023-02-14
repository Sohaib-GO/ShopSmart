import React, { useState, useEffect } from "react";

import useLogin from "../../components/authentication/useLogin";

const DistanceTime = (props) => {
  const [storeDistances, setStoreDistances] = useState([]);
  const [transportationMode, setTransportationMode] = useState("driving");
  const { user, isLoggedIn } = useLogin(props);
  const { store } = props;

  useEffect(() => {
    if (isLoggedIn) {
      const userAddress = user.address;

      const storeAddress = [store.store_address];
      // const storeNames = [selectedStore.store_name];

      Promise.all(
        storeAddress?.map((storeAddress, index) => {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${userAddress}&destinations=${storeAddress}&mode=${transportationMode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
          return fetch(url)
            .then((res) => res.json())
            .then((data) => {
              return {
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
  }, [user, transportationMode, isLoggedIn]);

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
        {storeDistances.length > 0 ? (
          storeDistances.map((storeDistance) => (
            <li key={storeDistance.name}>
              {storeDistance.distance},{" "}
              {storeDistance.duration}
            </li>
          ))
        ) : (
          <li>No stores added yet</li>
        )}
      </ul>
    </div>
  );
};

export default DistanceTime;
