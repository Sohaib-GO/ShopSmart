import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
const { useGroceryList } = require("../listings/useListingsHook");

const containerStyle = {
  width: "1980px",
  height: "1080px",
};

const center = {
  lat: 49.26376,
  lng: -123.14833,
};

const places = [
  { id: 1, lat: 49.259232, lng: -123.027290},
  { id: 2, lat: 49.26376, lng: -123.14833 },
  { id: 3, lat: 49.224390, lng: -123.090180 },
];


const divStyle = {
  background: `white`,
  border: `1 px solid #ccc`,
  padding: 15,
};

export default function Maps_test() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  console.log(useGroceryList);
  const [selectedMarker, setSelectedMarker] = useState(false);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const items = useGroceryList();
  console.log("------", items);
  const grocerylist = [];

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      id="Marker-test"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    {places.map((place, i) => {
      console.log('line 79', place)
      return (
        <Marker
          onClick={(e) => {
            setSelectedMarker(true);
          }}
          key={place.id}
          position={{lat: place.lat, lng: place.lng }}
        />
      )
    })}
     {places.map((place, i) => {
        return (
          <InfoWindow
            position={{lat: place.lat, lng: place.lng }}
            onCloseClick={() => {
              setSelectedMarker(false);
            }}
          >
        
        
          <>
            <h1>{items.groceries[0].store_name}</h1>
            {items.groceries[0].items.map((item) => {
              return (
                <div>
                  <p>{item.item_name}</p>
                  <p>{item.item_price}</p>
                </div>
              );
            })}
            <div>Total cost of this list: </div>
          </>
        </InfoWindow>
        )
      })}
      
      </GoogleMap>
  )
};
