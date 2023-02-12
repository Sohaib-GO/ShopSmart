import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { Fragment, useMemo, useState } from "react";
import useGroceryList from "../listings/useListingsHook";
import "./Map.css";
import mapPin from "../../images/map_pin_icon.png";

const containerStyle = {
  width: "900px",
  height: "300px",
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

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  const [selected, setSelected] = useState(null);
  const [map, setMap] = React.useState(null);
  const groceryLists = useGroceryList();

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(12);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  

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
        return <MarkerAndInfo key={store.store_id} store={store} />;
      })}
    </GoogleMap>
  );
}

const MarkerAndInfo = ({ store }) => {
  const [open, setOpen] = useState(false);

  const toggleOpenInfo = () => {
    setOpen(!open);
  };
  const storeLogo = store.store_image
  const storeLocation = {
    lat: Number(store.store_lat),
    lng: Number(store.store_lng),
  };
  return (
    <>
      <Marker onClick={toggleOpenInfo} position={storeLocation} />
      {open && (
        <InfoWindow position={storeLocation} onCloseClick={toggleOpenInfo}>
          <>
          <div class='info-window'>
            <img class="store-logo" src={storeLogo}/>
            <div class='address-container'>
              <img class='icon-map' src={mapPin}/>
              <p class='info-window-address'>{store.store_address}</p>
            </div>
            {store.items.map((item) => {
              return (
                <Fragment key={item.item_name}>
                  <p class="info-window-text">{item.item_name} - ${item.item_price}</p>
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
