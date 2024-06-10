import React, { useState, useEffect } from "react";
import "./BookingForm.css";

function BookingForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "17:00",
    guests: 1,
    occasion: "Birthday",
  });

  const [availableTimes, setAvailableTimes] = useState([]);

  const weekdayTimes = [
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];

  const weekendTimes = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, phone, date } = formData;
    setIsFormValid(
      name.trim() !== "" &&
        phone.trim() !== "" &&
        /^\d+$/.test(phone) &&
        date.trim() !== ""
    );
  }, [formData]);

  useEffect(() => {
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const dayOfWeek = selectedDate.getDay();
      const times =
        dayOfWeek === 5 || dayOfWeek === 6 ? weekendTimes : weekdayTimes;
      setAvailableTimes(times);
      setFormData({ ...formData, time: times[0] });
    } else {
      setAvailableTimes([]);
      setFormData({ ...formData, time: "" });
    }
  }, [formData.date]);

  const handleChange = (e) => {
    console.log(e.target.id);
    const { id, value } = e.target;
    if (id === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here to an api that holds everything in a database
    console.log("Form submitted:", formData);

    onSuccess();
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: 1,
      occasion: "Birthday",
    });
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <h1>Book Your Table Today</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          placeholder="First and Last"
          onChange={handleChange}
          aria-required="true"
        />

        <label htmlFor="date">Choose date</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          aria-required="true"
        />

        <label htmlFor="time">Choose Time</label>
        <select
          id="time"
          value={formData.time}
          onChange={handleChange}
          disabled={!formData.date}
        >
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          max="10"
          placeholder="1"
          aria-required="true"
        />

        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" value={formData.occasion} onChange={handleChange}>
          <option>Birthday</option>
          <option>Engagement</option>
          <option>Anniversary</option>
        </select>

        <label htmlFor="phone">How may we contact you?</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          aria-required="true"
        />

        {!isFormValid && (
          <div className="error-message">
            Please complete all fields to submit
          </div>
        )}

        <input
          type="submit"
          value="Make Your reservation"
          className={!isFormValid ? "disabled" : ""}
          title={!isFormValid ? "Please fill out all fields" : ""}
          aria-disabled={!isFormValid}
        />
      </form>
    </div>
  );
}

export default BookingForm;
