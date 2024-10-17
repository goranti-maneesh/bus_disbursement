import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Navbar = () => {
  const history = useHistory();

  const removeJwtTokenCookie = () => {
    Cookies.remove("Bus_disbursement_JWT_token");
    localStorage.removeItem("Student and Booking details");

    history.replace("/login");
  };

  return (
    <nav className="navbar">
      <h1>Bus Disbursement App</h1>
      <button
        className="logout-btn"
        type="button"
        onClick={removeJwtTokenCookie}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
