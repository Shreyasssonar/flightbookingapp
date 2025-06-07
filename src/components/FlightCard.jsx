import React from 'react';
import MiniMapView from './map';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  backgroundColor: '#FFFFFF',
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
};

const containerHoverStyle = {
  transform: 'scale(1.01)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
};

const infoStyle = {
  flex: '1 1 300px',
  paddingRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const mapStyle = {
  flex: '1 1 300px',
  minWidth: '300px',
  height: '200px',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#007BFF',
};

const textStyle = {
  fontSize: '16px',
  margin: '6px 0',
  color: '#555',
};

const FlightCard = ({ flight, onSelect }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      style={{ ...containerStyle, ...(hover ? containerHoverStyle : {}) }}
      onClick={() => onSelect(flight)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={infoStyle}>
        <h3 style={titleStyle}>{flight.airline}</h3>
        <p style={textStyle}><strong>Route:</strong> {flight.source} → {flight.destination}</p>
        <p style={textStyle}><strong>Departure:</strong> {flight.departureTime}</p>
        <p style={textStyle}><strong>Arrival:</strong> {flight.arrivalTime}</p>
        <p style={textStyle}><strong>Price:</strong> ₹{flight.price}</p>
      </div>

      <div style={mapStyle}>
        <MiniMapView
          source={flight.source}
          destination={flight.destination}
          flightNumber={flight.id || flight.flightNumber || ''}
        />
      </div>
    </div>
  );
};

export default FlightCard;
