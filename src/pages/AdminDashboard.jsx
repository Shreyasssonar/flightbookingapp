"use client";
import React, { useState } from "react";
import "../style/AdminDashboard.css";
import MapView from "../components/MapView";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddFlight, setShowAddFlight] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    from: "",
    to: "",
    date: "",
    price: "",
  });

  const [flights, setFlights] = useState([
    { id: 1, flightNumber: "AI101", from: "Delhi", to: "Mumbai", date: "2024-01-15", price: 3999, status: "Active" },
    { id: 2, flightNumber: "6E205", from: "Bangalore", to: "Hyderabad", date: "2024-01-16", price: 2899, status: "Active" },
    { id: 3, flightNumber: "SG308", from: "Kolkata", to: "Chennai", date: "2024-01-17", price: 3199, status: "Cancelled" },
    { id: 4, flightNumber: "UK450", from: "Ahmedabad", to: "Pune", date: "2024-01-18", price: 2749, status: "Active" },
    { id: 5, flightNumber: "IX789", from: "Lucknow", to: "Goa", date: "2024-01-19", price: 3599, status: "Active" }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, customerName: "John Doe", flightNumber: "AA101", bookingDate: "2024-01-10", status: "Confirmed" },
    { id: 2, customerName: "Jane Smith", flightNumber: "UA205", bookingDate: "2024-01-11", status: "Pending" },
    { id: 3, customerName: "Mike Johnson", flightNumber: "DL308", bookingDate: "2024-01-12", status: "Cancelled" },
  ]);

  const handleAddFlight = (e) => {
    e.preventDefault();
    if (newFlight.flightNumber && newFlight.from && newFlight.to && newFlight.date && newFlight.price) {
      setFlights([
        ...flights,
        {
          id: flights.length + 1,
          ...newFlight,
          price: Number.parseInt(newFlight.price),
          status: "Active",
        },
      ]);
      setNewFlight({ flightNumber: "", from: "", to: "", date: "", price: "" });
      setShowAddFlight(false);
    }
  };

  const handleDeleteFlight = (id) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)));
  };

  const stats = {
    totalFlights: flights.length,
    activeFlights: flights.filter((f) => f.status === "Active").length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter((b) => b.status === "Confirmed").length,
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <button onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab("flights")} className={activeTab === "flights" ? "active" : ""}>
          Flights
        </button>
        <button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
          Bookings
        </button>
      </div>

      <div className="main-content">
        {activeTab === "dashboard" && (
          <div>
            <div className="stat-container">
              <div className="stat-card blue"><h3>Total Flights</h3><p>{stats.totalFlights}</p></div>
              <div className="stat-card green"><h3>Active Flights</h3><p>{stats.activeFlights}</p></div>
              <div className="stat-card orange"><h3>Total Bookings</h3><p>{stats.totalBookings}</p></div>
              <div className="stat-card red"><h3>Confirmed Bookings</h3><p>{stats.confirmedBookings}</p></div>
            </div>

            <div className="recent-map-container">
              <div className="card recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                  <li>✅ Flight AA101 booking confirmed for John Doe</li>
                  <li>✈️ New flight DL308 added to system</li>
                  <li>❌ Flight UA205 booking cancelled by Jane Smith</li>
                  <li>📊 Monthly report generated successfully</li>
                </ul>
              </div>
              <div className="card map-view">
                <h3>All Flight Routes Map</h3>
                <MapView flights={flights} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "flights" && (
          <div className="card">
            <div className="header-row">
              <h3>Flight Management</h3>
              <button className="btn primary" onClick={() => setShowAddFlight(true)}>+ Add New Flight</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.id}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.from}</td>
                    <td>{flight.to}</td>
                    <td>{flight.date}</td>
                    <td>₹{flight.price}</td>
                    <td>
                      <span className={`badge ${flight.status === "Active" ? "active" : "cancelled"}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn primary">Edit</button>
                      <button className="btn danger" onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="card">
            <h3>Booking Management</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer Name</th>
                  <th>Flight Number</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.flightNumber}</td>
                    <td>{booking.bookingDate}</td>
                    <td><span className={`badge ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                    <td>
                      {booking.status === "Pending" ? (
                        <>
                          <button className="btn success" onClick={() => handleUpdateBookingStatus(booking.id, "Confirmed")}>Confirm</button>
                          <button className="btn danger" onClick={() => handleUpdateBookingStatus(booking.id, "Cancelled")}>Cancel</button>
                        </>
                      ) : (
                        <button className="btn primary">View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddFlight && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Flight</h3>
            <form onSubmit={handleAddFlight}>
              <input type="text" placeholder="Flight Number" value={newFlight.flightNumber} onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })} required />
              <input type="text" placeholder="From (e.g. Delhi)" value={newFlight.from} onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })} required />
              <input type="text" placeholder="To (e.g. Mumbai)" value={newFlight.to} onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })} required />
              <input type="date" value={newFlight.date} onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })} required />
              <input type="number" placeholder="Price" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} required />
              <div className="btn-group">
                <button type="button" className="btn grey" onClick={() => setShowAddFlight(false)}>Cancel</button>
                <button type="submit" className="btn success">Add Flight</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
