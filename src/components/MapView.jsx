// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
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

const MapView = ({ flights }) => {
  if (!flights || flights.length === 0) return <p>No flights to show on map.</p>;

  // Gather all coordinates and polylines
  const flightPaths = [];
  const markers = [];

  flights.forEach(flight => {
    const src = locations[flight.from];
    const dest = locations[flight.to];

    if (src && dest) {
      flightPaths.push([src, dest]);

      markers.push({
        position: src,
        label: `From: ${flight.from} (${flight.flightNumber})`
      });

      markers.push({
        position: dest,
        label: `To: ${flight.to}`
      });
    }
  });

  // Compute center for map
  const allCoords = markers.map(m => m.position);
  const avgLat = allCoords.reduce((sum, c) => sum + c[0], 0) / allCoords.length;
  const avgLng = allCoords.reduce((sum, c) => sum + c[1], 0) / allCoords.length;

  return (
    <MapContainer center={[avgLat, avgLng]} zoom={4} style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '8px' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      {flightPaths.map((path, idx) => (
        <Polyline key={idx} positions={path} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MapView;
