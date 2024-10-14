import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { deployedApiUrl, developmentApiUrl } from "../../common";
import { BookingContext } from "../../context/context";

import Navbar from "../Navbar";

import "./index.css";

const Booking = () => {
  const { studentData, busData } = useContext(BookingContext);
  const [loading, setLoading] = useState(false);
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

      const res = await fetch(`${deployedApiUrl}/api/book`, options);
      const data = await res.json();

      alert(data.msg);
      history.push("/buses");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bus details:", error);
      alert(error.msg);
    }
  };

  // if (loading) {
  // 	return <div>Loading bus details...</div>;
  // }

  console.log(studentData, busData);
  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default Booking;
