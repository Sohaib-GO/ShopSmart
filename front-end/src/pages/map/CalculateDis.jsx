import React, { useState, useEffect } from "react";
import useLogin from "../../components/authentication/useLogin";
import {
  DirectionsTransit,
  DirectionsWalk,
  DirectionsBike,
  DirectionsCar,
} from "@mui/icons-material";
import {
  Select,
  ListItemIcon,
  MenuItem,
  ListItemText,
  List,
  ListItem,
  Tabs,
  Tab,
} from "@mui/material";

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
  const transportationIcons = {
    driving: <DirectionsCar />,
    walking: <DirectionsWalk />,
    bicycling: <DirectionsBike />,
    transit: <DirectionsTransit />,
  };

  return (
    <div className="modeOfTransportation">
      {storeDistances.length > 0 && (
        <Tabs
          value={transportationMode}
          onChange={(event, value) => setTransportationMode(value)}
        >
          <Tab icon={<DirectionsCar />} value="driving" label="Driving" />
          <Tab icon={<DirectionsWalk />} value="walking" label="Walking" />
          <Tab icon={<DirectionsBike />} value="bicycling" label="Bicycling" />
          <Tab icon={<DirectionsTransit />} value="transit" label="Transit" />
        </Tabs>
      )}
      <List>
        {storeDistances.length > 0 ? (
          storeDistances.map((storeDistance) => (
            <ListItem key={storeDistance.name}>
              <ListItemIcon>
                {transportationIcons[transportationMode]}
              </ListItemIcon>
              <ListItemText
                primary={`${storeDistance.distance}, ${storeDistance.duration}`}
                secondary={storeDistance.name}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>No stores added yet</ListItem>
        )}
      </List>
    </div>
  );
};

export default DistanceTime;
