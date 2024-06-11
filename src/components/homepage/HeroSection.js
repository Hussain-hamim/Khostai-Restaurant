import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../images/hero-section.jpg";

function HeroSection() {
  return (
    <div className="Hero-Section-Container">
      <div className="Hero-Section-Content">
        <div className="Hero-Text">
          <h1>Khostai Restaurant</h1>
          <h2>Khost</h2>
          <p>
            We are a family owned modern restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <Link to="/reservations">
            <button className="Yellow-Button">Reserve a Table</button>
          </Link>
        </div>

        <div className="Hero-Image-Container">
          <img
            src={heroImage}
            alt="khostai Restaurant"
            className="Hero-Image"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
