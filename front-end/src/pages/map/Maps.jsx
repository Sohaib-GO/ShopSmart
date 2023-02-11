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
  lat:  53.5790106,
  lng: -113.5799218,
};

const places = [
  { id: 1, lat: 53.5790106, lng: -113.4799218},
  { id: 2, lat:53.5790106, lng: -113.3799218} ,
  { id: 3, lat: 53.5790106, lng:-113.2799218}
]

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

  const [selectedMarker, setSelectedMarker] = useState(false);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(12)

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const items = useGroceryList();
  // console.log(items)

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
    {items.groceries.map((e, i) => {
      console.log(e)
      return (
        <Marker
          onClick={(e) => {
            setSelectedMarker(true);
          }}
          key={e.store_id}
          position={{lat: Number(e.store_lat), lng: Number(e.store_lng) }}
        />
      )
    })}
     {items.groceries.map((e, i) => {
        return (
          <InfoWindow
            key={e.store_id}
            position={{lat: Number(e.store_lat), lng: Number(e.store_lng) }}
            onCloseClick={() => {
              setSelectedMarker(false);
            }}
          >
          <>
            {items.groceries.items.map((item) => {
              return (
                <div>
                  <p>{item.item_name}</p>
                  <p>{item.item_price}</p>
                </div>
              );
            })}
          </>
        </InfoWindow>
        )
      })}
      
      </GoogleMap>
  )
};
