import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
import '../style/SearchFlights.css';

const allFlights = [
  { id: 1, airline: 'IndiGo', source: 'Pune', destination: 'Mumbai', departureTime: '08:00', arrivalTime: '09:00', price: 2500 },
  { id: 2, airline: 'AirIndia', source: 'Delhi', destination: 'Bangalore', departureTime: '10:30', arrivalTime: '13:15', price: 5200 },
  { id: 3, airline: 'SpiceJet', source: 'Chennai', destination: 'Kolkata', departureTime: '14:00', arrivalTime: '16:30', price: 3800 },
  { id: 4, airline: 'Vistara', source: 'Mumbai', destination: 'Delhi', departureTime: '07:45', arrivalTime: '09:50', price: 4500 },
  { id: 5, airline: 'GoAir', source: 'Bangalore', destination: 'Hyderabad', departureTime: '12:15', arrivalTime: '13:20', price: 3000 },
  { id: 6, airline: 'IndiGo', source: 'Kolkata', destination: 'Pune', departureTime: '09:30', arrivalTime: '12:00', price: 4700 },
  { id: 7, airline: 'AirAsia', source: 'Jaipur', destination: 'Chennai', departureTime: '15:00', arrivalTime: '17:45', price: 5100 },
  { id: 8, airline: 'SpiceJet', source: 'Ahmedabad', destination: 'Goa', departureTime: '11:00', arrivalTime: '12:30', price: 3200 },
  { id: 9, airline: 'Vistara', source: 'Delhi', destination: 'Mumbai', departureTime: '18:00', arrivalTime: '20:15', price: 4800 },
  { id: 10, airline: 'IndiGo', source: 'Hyderabad', destination: 'Bangalore', departureTime: '06:30', arrivalTime: '07:40', price: 2900 },
  { id: 11, airline: 'AirIndia', source: 'Mumbai', destination: 'Chennai', departureTime: '13:45', arrivalTime: '15:50', price: 4600 },
  { id: 12, airline: 'GoAir', source: 'Pune', destination: 'Delhi', departureTime: '16:20', arrivalTime: '18:40', price: 4300 }
];

const SearchFlights = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [sourceInput, setSourceInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = allFlights.filter(flight => {
      const matchesSource = flight.source.toLowerCase().includes(sourceInput.toLowerCase());
      const matchesDestination = flight.destination.toLowerCase().includes(destinationInput.toLowerCase());
      
      // Check price range - if minPrice or maxPrice are empty, ignore that limit
      const matchesMinPrice = minPrice === '' || flight.price >= Number(minPrice);
      const matchesMaxPrice = maxPrice === '' || flight.price <= Number(maxPrice);

      return matchesSource && matchesDestination && matchesMinPrice && matchesMaxPrice;
    });
    setSearchResults(filtered);
  };

  const handleSelectFlight = (flight) => {
    navigate('/booking', { state: { flight, travelDate, passengerCount } });
  };

  // Unique sources and destinations for suggestions
  const sourceOptions = [...new Set(allFlights.map(f => f.source))];
  const destinationOptions = [...new Set(allFlights.map(f => f.destination))];

  return (
    <div className="search-container">
      <h2>Search Flights</h2>
      <div className="search-inputs">
        <input
          type="text"
          list="source-options"
          placeholder="Enter Source"
          value={sourceInput}
          onChange={(e) => setSourceInput(e.target.value)}
        />
        <datalist id="source-options">
          {sourceOptions.map((source, idx) => (
            <option key={idx} value={source} />
          ))}
        </datalist>

        <input
          type="text"
          list="destination-options"
          placeholder="Enter Destination"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
        />
        <datalist id="destination-options">
          {destinationOptions.map((dest, idx) => (
            <option key={idx} value={dest} />
          ))}
        </datalist>

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />

        <input
          type="number"
          min={1}
          max={10}
          value={passengerCount}
          onChange={(e) => setPassengerCount(Number(e.target.value))}
          placeholder="Passengers"
        />

        <input
          type="number"
          min={0}
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)} 
        />

        <input
          type="number"
          min={0}
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="flight-list">
        {searchResults.length > 0 ? (
          searchResults.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={() => handleSelectFlight(flight)}
            />
          ))
        ) : (
          <p className="no-flights-message">
            <img src="./no-traveling.png" alt="No flights available" />
            No flights available.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchFlights;


