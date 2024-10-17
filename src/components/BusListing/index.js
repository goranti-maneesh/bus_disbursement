import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { apiUrl, tickImage } from "../../common";
import { BookingContext } from "../../context/context";

import "./index.css";
import Navbar from "../Navbar";

const BusListing = () => {
  const [buses, setBuses] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [alreadyBooked, setAlreadyBookedStatus] = useState(false);
  const { setBusData, studentData } = useContext(BookingContext);
  const history = useHistory();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const { destination } = studentData;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentID: studentData.studentID,
          }),
        };

        const res = await fetch(
          `${apiUrl}/api/buses?destination=${destination}`,
          options
        );
        const data = await res.json();
        setAlreadyBookedStatus(data.alreadyBooked);
        if (data.alreadyBooked) {
          setBookingDetails(data.data);
        } else {
          setBuses(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };
    fetchBuses();
  }, []);

  const onClickSelectedBus = (bus) => {
    setBusData(bus);
    console.log(bus, "bus listing");
    history.push(`/booking/${bus.busID}`);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#007bff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const renderBusesList = () => {
    return (
      <div className="bus-listing">
        <h2>Available Buses</h2>
        <ul>
          {buses.map((bus) => (
            <li key={bus.busID}>
              <div className="bus-info">
                <p>
                  {bus.destination} - {bus.timing}
                </p>
                <p>Seats Available: {bus.seatsAvailable}</p>
                <button type="button" onClick={() => onClickSelectedBus(bus)}>
                  Book Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderAlreadyBookedUI = () => {
    return (
      <div className="booking-container">
        <div className="booked-details-container">
          <h1>Already Booked a seat</h1>
          <div className="img-container">
            <img src={tickImage} alt="Success" className="success-img" />
          </div>
          <p>
            <span>Destination: </span>
            {bookingDetails.destination}
          </p>
          <p>
            <span>Timings: </span>
            {bookingDetails.busTiming}
          </p>
          <p>
            <span>Name: </span>
            {bookingDetails.studentName}
          </p>
          <p>
            <span>ID: </span>
            {bookingDetails.studentID}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {alreadyBooked ? renderAlreadyBookedUI() : renderBusesList()}
    </div>
  );
};

export default BusListing;
