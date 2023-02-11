import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
const { useGroceryList } = require("../listings/useListingsHook")

const containerStyle = {
    width: '1980px',
    height: '1080px'
  };
  
  const center = {
    lat: 49.263760,
    lng: -123.148330
  };

  const location = {
    lat: 49.263760,
    lng: -123.148330
  }
  
  const divStyle = {
    background: `white`,
    border: `1 px solid #ccc`,
    padding: 15
  }

  
export default function Maps_test() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxSBp4edh5BzrKcIJa6ZrP7G5tQJVNFKo",
  });

  console.log(useGroceryList)
  const [selectedMarker, setSelectedMarker] = useState(false)

  const [map, setMap] = React.useState(null);


  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const items = useGroceryList()
  console.log("------",items)
  const grocerylist = []

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
    {/* potential map over marker and info window when we have more than 1 list */}
      <Marker
        onClick={()=>{setSelectedMarker(true)}}
        position={location}
      />
      <InfoWindow 
        position={location}
        onCloseClick={()=>{setSelectedMarker(false)}}
      >
        <>
        {
          items.groceries[0].items.map((item) => {
            return(
              <div>
                <h1>{item.item_name}</h1>
                <h1>{item.item_price}</h1>
                <div> {items.handleDeleteGroceryItem(item.item_name, /*get store value so you can delete*/ )}</div>
              </div>
            )
          })
        }
        <div>Total cost of this list: </div>
        </>

      </InfoWindow>
    </GoogleMap>
    );
  // })

}

