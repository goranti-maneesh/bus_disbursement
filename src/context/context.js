import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export const BookingContext = createContext();

const savedStudentData = localStorage.getItem("Student and Booking details");

export const BookingProvider = ({ children }) => {
  const history = useHistory();

  const [studentData, setStudentData] = useState(() => {
    return savedStudentData ? JSON.parse(savedStudentData).studentData : {};
  });

  const [busData, setBusData] = useState(() => {
    return savedStudentData ? JSON.parse(savedStudentData).busData : {};
  });

  useEffect(() => {
    if (studentData) {
      localStorage.setItem(
        "Student and Booking details",
        JSON.stringify({ studentData, busData })
      );
    }
  }, [studentData, busData]);

  return (
    <BookingContext.Provider
      value={{ studentData, setStudentData, busData, setBusData }}
    >
      {children}
    </BookingContext.Provider>
  );
};
