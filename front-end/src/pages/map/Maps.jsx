import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo } from "react";
import React from "react";
// import Map from "../../components/Map/Map";

const containerStyle = {
    width: '1980px',
    height: '1080px'
  };
  
  const center = {
    lat: 49.2827,
    lng: -123.1207
  };

export default function Maps_test() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

