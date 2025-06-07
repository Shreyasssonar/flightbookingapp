import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/Booking.css';
import MapView from '../components/map';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  const [passenger, setPassenger] = useState('');

  const handleBooking = () => {
    console.log('Booking details:', { passenger, flight });
    navigate('/payment');
  };

  if (!flight) return <p className="booking-no-flight">No flight selected.</p>;

  return (
    <div className="booking-container">
      <h2>Booking Page</h2>
      <p><strong>Flight:</strong> {flight.airline} ({flight.source} → {flight.destination})</p>
      <p><strong>Price:</strong> ₹{flight.price}</p>
      <input
        type="text"
        placeholder="Passenger Name"
        value={passenger}
        onChange={e => setPassenger(e.target.value)}
      />
      <button onClick={handleBooking}>Confirm Booking</button>
      <MapView source={flight.source} destination={flight.destination} />
    </div>
  );
};

export default Booking;
