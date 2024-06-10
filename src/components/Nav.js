import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ isVisible }) {
  return (
    <nav className={`Nav ${isVisible ? 'Nav-visible' : ''}`}>
      <ul className="Nav-list">
        <li className="Nav-item"><Link to="/">Home</Link></li>
        <li className="Nav-item"><Link to="/about">About</Link></li>
        <li className="Nav-item"><Link to="/menu">Menu</Link></li>
        <li className="Nav-item"><Link to="/reservations">Reservations</Link></li>
        <li className="Nav-item"><Link to="/order-online">Order Online</Link></li>
        <li className="Nav-item"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
