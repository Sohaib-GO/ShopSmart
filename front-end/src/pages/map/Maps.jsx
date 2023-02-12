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

  const [state, setState] = useState(false);


const handleToggleOpen = () => {
    setState({
      isOpen: true,
    })
  }

const handleToggleClose = () => {
    setState({
      isOpen: false,
    })
  }

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
  console.log(items)

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
      return (
        <Marker
          onClick={() => {handleToggleOpen()}}
          key={e.store_id}
          position={{lat: Number(e.store_lat), lng: Number(e.store_lng) }}
        />
      )
    })}
     {items.groceries.map((e, i) => {
      console.log(e)
        return (
          <InfoWindow
            key={e.store_id}
            position={{lat: Number(e.store_lat), lng: Number(e.store_lng) }}
            onCloseClick={() => {handleToggleClose()}}
          >
          <>
            <h1>{e.store_name}</h1>
            {e.items.map((e, i) => {
              console.log('----', e)
              return (
                <div>
                  <p>{e.items[0].item_name}</p>
                  <p>{e.items[0].item_price}</p>
                </div>
              )
            })}
            
          </>
        </InfoWindow>
        )
      })}
      
    </GoogleMap>
  )
};
