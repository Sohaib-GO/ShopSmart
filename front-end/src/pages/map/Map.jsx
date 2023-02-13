import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { Fragment, useState } from "react";
import useGroceryList from "../listings/useListingsHook";
import "./Map.css";
import mapPin from "../../images/map_pin_icon.png";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const center = {
  lat: 53.5790106,
  lng: -113.5799218,
};

const divStyle = {
  background: `white`,
  border: `1 px solid #ccc`,
  padding: 15,
};

export default function Map(props) {
  

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  const [map, setMap] = React.useState(null);

  const [isListsOpen, setListsOpen] = useState(false) 

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(11.5);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const groceryLists = useGroceryList();

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
      {groceryLists.groceries.map((store) => {
        return <MarkerAndInfo key={store.store_id} store={store}
        renderStore={isListsOpen[store.store_id]}  
      />;
      })}
    </GoogleMap>
  );
}

const MarkerAndInfo = ({ store, renderStore }) => {
  const [selectedStore, setSelectedStore] = useState(false)
  const [open, setOpen] = useState(false);

  const toggleOpenInfo = () => {
    setSelectedStore(!selectedStore); 
  };

  const storeLogo = store.store_image

  const storeLocation = {
    lat: Number(store.store_lat),
    lng: Number(store.store_lng),
  };

  return (
    <>
      <Marker onClick={toggleOpenInfo} position={storeLocation} />
      {renderStore && (
        <InfoWindow position={storeLocation} onCloseClick={toggleOpenInfo}
          options={{pixelOffset: new window.google.maps.Size(0, -30)}}
        >
          <>
          <div class='info-window'>
            <img class="store-logo" src={storeLogo}/>
            <div class='address-container'>
              <p class='info-window-address'>{store.store_address}</p>
            </div>
            {store.items.map((item) => {
              return (
                <Fragment key={item.item_name}>
                  {/* <p class="info-window-text">{item.item_name} - ${item.item_price}</p> */}
                </Fragment>
              );
            })}
          </div>
          </>
        </InfoWindow>
      )}
    </>
  );
};
