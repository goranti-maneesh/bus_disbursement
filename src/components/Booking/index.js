import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { apiUrl, tickImage } from "../../common";
import { BookingContext } from "../../context/context";

import Navbar from "../Navbar";

import "./index.css";

const Booking = () => {
  const { studentData, busData } = useContext(BookingContext);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(false);
  const history = useHistory();

  const handleBooking = async () => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          busID: busData.busID,
          studentID: studentData.studentID,
          studentName: studentData.name,
          destination: busData.destination,
          busTiming: busData.timing,
        }),
      };

      const res = await fetch(`${apiUrl}/api/book`, options);
      const data = await res.json();

      alert(data.msg);
      //   history.push("/buses");
      setLoading(false);
      setBookingStatus(true);
    } catch (error) {
      console.error("Error fetching bus details:", error);
      alert(error.msg);
    }
  };

  const renderConfirmationDetails = () => (
    <div className="booking-container">
      <h2>
        Booking for {busData.destination} at {busData.timing}
      </h2>
      <p>Name: {studentData.name}</p>
      <p>ID: {studentData.studentID}</p>
      <p>Bus ID: {busData.busID}</p>
      <p>Seats Available: {busData.seatsAvailable}</p>
      <button onClick={handleBooking}>
        {loading ? "Loading..." : "Confirm Booking"}
      </button>
    </div>
  );

  const renderSeatBookedDetails = () => (
    <div className="booking-container">
      <div className="booked-details-container">
        <div>
          <h1>Seat Booked</h1>
          <div className="img-container">
            <img src={tickImage} alt="Success" className="success-img" />
          </div>
          <p>
            <span>Destination: </span>
            {busData.destination}
          </p>
          <p>
            <span>Timings: </span>
            {busData.timing}
          </p>
          <p>
            <span>Name: </span>
            {studentData.name}
          </p>
          <p>
            <span>ID: </span>
            {studentData.studentID}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {bookingStatus ? renderSeatBookedDetails() : renderConfirmationDetails()}
    </div>
  );
};

export default Booking;
