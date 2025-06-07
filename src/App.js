import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchFlights from './pages/SearchFlights';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const showNavbar = !['/', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar userRole="admin" />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
