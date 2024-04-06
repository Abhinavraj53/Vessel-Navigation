import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import Topdiv from "./components/topdiv";

const customIconStart = new Icon({
  iconUrl: require("./icons/placeholder2.png"),
  iconSize: [38, 38]
});

const customIconEnd = new Icon({
  iconUrl: require("./icons/placeholder3.png"),
  iconSize: [38, 38]
});

const markers = [
  {
    geocode: [22.1696, 91.4996],
  },
  {
    geocode: [22.2637, 91.7159],
  }
];

const App = () => {
  const [position, setPosition] = useState({ lat: 22.1696, lng: 91.4996 });
  const speed = 20; // Define speed here

  useEffect(() => {
    const targetPosition = { lat: 22.2636, lng: 91.7159 };
    const distance = Math.sqrt(
      Math.pow(targetPosition.lat - position.lat, 2) +
      Math.pow(targetPosition.lng - position.lng, 2)
    );

    const refreshRate = 2; // fps
    const time = (distance / speed) * 3600; // in seconds
    const steps = time * refreshRate; // total steps

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const fraction = currentStep / steps;
      setPosition({
        lat: position.lat + fraction * (targetPosition.lat - position.lat),
        lng: position.lng + fraction * (targetPosition.lng - position.lng)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setPosition(targetPosition);
      }
    }, 1000 / refreshRate);

    return () => clearInterval(interval);
  }, []);

  const customIcon = new Icon({
    iconUrl: require("./icons/pointer.png"),
    iconSize: [59, 32.33],
    rotationAngle: 70
  });

  return (
    <div className="main">
      <Topdiv
        startingLat={markers[0].geocode[0]}
        startingLng={markers[0].geocode[1]}
        endingLat={markers[1].geocode[0]}
        endingLng={markers[1].geocode[1]}
        speed={speed} // Pass speed as a prop
      />

      <MapContainer center={[22.2166, 91.60775]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markers[0].geocode} icon={customIconStart} />
        <Marker position={markers[1].geocode} icon={customIconEnd} />
        <Marker position={position} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default App;
