import React, { useEffect, useState, useRef,useCallback } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer, InfoWindow } from "@react-google-maps/api";
import './MapStyles.css';
import StarRating from "./StarRating"; 
import { TbLocation } from 'react-icons/tb';

console.log('Google Maps API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

const libraries = ["places"];
const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York City

export default function Map({ selectedBathroom, lat, long, setLat, setLong, displayBathrooms }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(defaultLocation);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    const geocoder = new window.google.maps.Geocoder();
    map.fitBounds(bounds);
    setMap(map);
    setGeocoder(geocoder);
  }, []);

  const onUnmount = useCallback(function () {
    setMap(null);
  }, []);

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: `${lat},${long}`,
      destination: `${selectedBathroom.lat},${selectedBathroom.lng}`,
      travelMode: window.google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const address = data.results[0].formatted_address;
              console.log("User's address:", address);
              setLat(latitude);
              setLong(longitude);
              setCenter({ lat: latitude, lng: longitude });
              setAddress(address);
            } else {
              console.log("No results found");
              handleLocationError("Unable to find address for this location.");
            }
          } catch (error) {
            console.error("Error getting address from coordinates:", error);
            handleLocationError("Error getting address from coordinates.");
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
          handleLocationError(error.message);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 5000, 
          maximumAge: 0 
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      handleLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleLocationError = (message) => {
    console.error(message);
    setLat(defaultLocation.lat);
    setLong(defaultLocation.lng);
    setCenter(defaultLocation);
    setAddress("New York City, NY, USA");
    alert(`Unable to get your location: ${message}\nFalling back to default location.`);
  };

  useEffect(() => {
    if (selectedBathroom) {
      calculateRoute();
    }
  }, [selectedBathroom]);

  const onGeocode = () => {
    if (geocoder) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          setCenter({ lat: location.lat(), lng: location.lng() });
          setLat(location.lat());
          setLong(location.lng());
        } else {
          console.error("Geocode was not successful for the following reason:", status);
        }
      });
    }
  };

  const containerStyle = {
    width: '100%',
    height: '90vh',
    backgroundColor: 'white'
  };

  const blueMapStyles = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#70b0ce" }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        { "color": "##E5ECE4" }
      ]
    },
  ];

  return isLoaded ? (
    <>
      <div className="relative w-full">
        <div className="search absolute top-2 left-1/4 z-10 p-2 rounded w-2/4 bg-cyan-300 bg-opacity-40 overflow-hidden ">
          <div className="flex items-center justify-between bg-cyan-700 rounded">
            <button onClick={getUserLocation} className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-r">
              <TbLocation/>
            </button>
            <Autocomplete className="flex-1 mx-2 bg-cyan-900 ">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onGeocode();
                  }
                }}
                placeholder="Enter address"
                className="px-8 py-2 flex-grow text-white bg-cyan-900 bg-opacity-90"
              />
            </Autocomplete>
            <button onClick={onGeocode} className="bg-cyan-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-r">
              Find Bathrooms
            </button>
          </div>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ styles: blueMapStyles }}
          >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            {displayBathrooms.map((displayBathroom) => (
              <Marker
                key={displayBathroom.id}
                position={{ lat: parseFloat(displayBathroom.lat), lng: parseFloat(displayBathroom.lng) }}
                onClick={() => setSelected(displayBathroom)}
              />
            ))}
            {selected && (
              <InfoWindow
                position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="info-window">
                  <h4>{selected.name}</h4>
                  <div className="rating">
                    <StarRating rating={selected.rating} />
                  </div>
                  <Link to={`/bathrooms/${selected.id}`}>View Details</Link>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          <div className="absolute bottom-7 right-20 z-10">
            <Link to={"/addBathroom"}>
              <button className="bg-sky-900 text-white rounded-full p-4 hover:bg-blue-800 focus:outline-none">
                Add Bathroom
              </button>
            </Link>
          </div>
          {directionsResponse && (
            <div className="absolute bottom-7 left-5 z-10 bg-cyan-200 rounded flex p-2 bg-opacity-80">
              <div className="flex flex-col text-stone-100 py-7 bg-cyan-700 p-1 bg-opacity-80">
                <text>Distance: {distance}</text>
                <text>Duration: {duration}</text>
                <button onClick={clearRoute}> Clear Routes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}
