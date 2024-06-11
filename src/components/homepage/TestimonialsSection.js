import React from "react";
import TestimonialCard from "./TestimonialCard";

import testimonial1 from "../../images/testimonial-1.jpg";
import testimonial2 from "../../images/testimonial-2.jpg";
import testimonial3 from "../../images/testimonial-3.jpg";

export default function TestimonialsSection() {
  return (
    <div className="Testimonials-Section-Container">
      <div className="Testimonials-Section">
        <h1>Here is what's being said.</h1>
        <div className="Testimonial-Cards">
          <TestimonialCard
            rating="9/10"
            picture={testimonial1}
            customerName="Charlie Martinez"
            message="Excellent food, excellent service, excellent prices."
          />

          <TestimonialCard
            rating="10/10"
            picture={testimonial3}
            customerName="Jack Thomas"
            message="Amazing experience all the way!"
          />

          <TestimonialCard
            rating="8/10"
            picture={testimonial2}
            customerName="Hussain Hamim"
            message="Lovely test and great food. Will come again!"
          />
        </div>
      </div>
    </div>
  );
}
