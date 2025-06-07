// src/components/MiniMapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locations = {
  Pune: [18.5204, 73.8567],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.7041, 77.1025],
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
  Hyderabad: [17.385, 78.4867],
  Jaipur: [26.9124, 75.7873],
  Ahmedabad: [23.0225, 72.5714],
  Goa: [15.2993, 74.124],
  NewYork: [40.7128, -74.0060],
  LosAngeles: [34.0522, -118.2437],
  Chicago: [41.8781, -87.6298],
  Miami: [25.7617, -80.1918],
  Boston: [42.3601, -71.0589],
  Seattle: [47.6062, -122.3321],
};

const  Map = ({ source, destination, flightNumber }) => {
  const fromCoords = locations[source];
  const toCoords = locations[destination];

  if (!fromCoords || !toCoords) return <p style={{ fontSize: '12px' }}>Map unavailable</p>;

  const center = [
    (fromCoords[0] + toCoords[0]) / 2,
    (fromCoords[1] + toCoords[1]) / 2
  ];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: '200px', width: '100%', marginTop: '10px', borderRadius: '8px' }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={fromCoords}><Popup>From: {source} ({flightNumber})</Popup></Marker>
      <Marker position={toCoords}><Popup>To: {destination}</Popup></Marker>
      <Polyline positions={[fromCoords, toCoords]} color="blue" />
    </MapContainer>
  );
};

export default Map;
