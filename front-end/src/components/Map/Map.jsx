import React from "react";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'


const containerStyle = {
  width: '400px',
  height: '400px'
}

const center = {
  lat: 49.262475,
  long: -123.115357
}

export default function Maps() {


  function MyComponent() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {

      const bounds = new window.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])


    
    return isLoaded ? (
      <GoogleMap 
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      >
      <></>
    </GoogleMap>
  )  : <></>
}
}

