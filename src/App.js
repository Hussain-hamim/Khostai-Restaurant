import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/homepage/HomePage';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import ReservationPage from './components/reservation-page/ReservationPage';
import OnlineOrderPage from './components/OnlineOrderPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/order-online" element={<OnlineOrderPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;