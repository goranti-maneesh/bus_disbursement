import React, { createContext, useState, useEffect } from "react";

// Create a context
export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(() => {
    // Retrieve student data from localStorage (if it exists) when the app starts
    const savedStudentData = localStorage.getItem("studentData");
    return savedStudentData ? JSON.parse(savedStudentData) : {};
  });

  const [busData, setBusData] = useState(null);

  useEffect(() => {
    // Store student data in localStorage whenever it changes
    if (studentData) {
      localStorage.setItem("studentData", JSON.stringify(studentData));
    }
  }, [studentData]);

  return (
    <BookingContext.Provider
      value={{ studentData, setStudentData, busData, setBusData }}
    >
      {children}
    </BookingContext.Provider>
  );
};
