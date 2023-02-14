import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { Fragment, useState } from "react";
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

  const [selected, setSelected] = useState(null);
  const [map, setMap] = React.useState(null);
  const { groceries } = props;

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(11.5);

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
      {groceries.map((store) => {
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
  const storeLogo = store.store_image;
  const storeLocation = {
    lat: Number(store.store_lat),
    lng: Number(store.store_lng),
  };

  return (
    <>
      <Marker
        position={storeLocation}
        onClick={() => toggleOpenInfo()}
        storeName={store.name}
      />
      {open && (
        <InfoWindow position={storeLocation} onCloseClick={toggleOpenInfo}>
          <>
            <div class="info-window">
              <img class="store-logo" src={storeLogo} alt="store logo" />
              <div class="address-container">
                <img class="icon-map" src={mapPin} alt="map pin icon" />
                <p class="info-window-address">{store.store_address}</p>
              </div>
              <p class="info-window-text">
            Number of items: {store.items.length}
          </p>
            </div>
          </>
        </InfoWindow>
      )}
    </>
  );
};
