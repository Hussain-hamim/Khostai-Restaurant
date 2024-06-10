import React from "react";
import { Link } from "react-router-dom";
import SpecialsCard from "./SpecialsCard";

import greekSaladImage from "../../images/greek salad.jpg";
import bruscettaImage from "../../images/bruchetta.png";
import lemonDessertImage from "../../images/lemon dessert.jpg";

function SpecialsSection() {
  return (
    <div className="Specials-Section">
      <div className="specials-header">
        <h1>This Week's Specials!</h1>
        <Link to="/menu">
          <button className="Yellow-Button">Online Menu</button>
        </Link>
      </div>
      <div className="specials-cards">
        <SpecialsCard
          picture={greekSaladImage}
          title="Greek Salad"
          description="Fresh vegetables, feta cheese, olives, and olive oil."
          price="$9.99"
        />
        <SpecialsCard
          picture={bruscettaImage}
          title="Bruschetta"
          description="Toasted bread topped with tomatoes, garlic, basil, and olive oil."
          price="$6.99"
        />
        <SpecialsCard
          picture={lemonDessertImage}
          title="Lemon Dessert"
          description="Delicious lemon-flavored dessert, perfect to refresh your palate."
          price="$5.99"
        />
      </div>
    </div>
  );
}

export default SpecialsSection;
