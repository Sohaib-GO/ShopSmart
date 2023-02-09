import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo } from "react";
import {useState} from "react";
import React from "react";
// import Map from "../../components/Map/Map";


const containerStyle = {
    width: '1980px',
    height: '1080px'
  };
  
  const center = {
    lat: 49.263760,
    lng: -123.148330
  };

  const location= {
    lat: 49.263760,
    lng: -123.148330
  }
  
  const divStyle ={
    background: `white`,
    border: `1 px solid #ccc`,
    padding: 15
  }

  
export default function Maps_test() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  const [selectedMarker, setSelectedMarker] = useState(null)

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
      id='Marker-test'
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >      
    <Marker
        onClick={()=>{setSelectedMarker("")}}
        position={location}
    />
    <InfoWindow 
      position={location}
      onCloseClick={()=>{setSelectedMarker(null)}}
    >
      <div>
        <h1>Info</h1>
      </div>
    </InfoWindow>
        <></>
    </GoogleMap>
  );
}

