import React from "react";

export default function TestimonialCard({ rating, picture, customerName, message }) {
    return(
        <div className="Testimonial-Card">
            <h1>Rating: {rating}</h1>
            <div className="Testimonial-Image">
                <img src={picture} alt='Picture' />
            </div>
            <h2>{customerName}</h2>
            <p>{message}</p>
        </div>
    );
}

