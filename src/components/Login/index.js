import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { apiUrl } from "../../common";
import { BookingContext } from "../../context/context";
import { isLoggedIn } from "../../common/auth";

import "./index.css";

const Login = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setStudentData, studentData } = useContext(BookingContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentID, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStudentData({
          studentID: data.user.studentID,
          name: data.user.name,
          destination: data.user.destination,
        });
        Cookies.set("Bus_disbursement_JWT_token", data.token, {
          expires: 1 / 24,
        });
        history.replace("/buses");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("login", isLoggedIn(studentData));
    if (isLoggedIn(studentData)) {
      history.replace("/login");
    } else {
      history.replace("/buses");
    }
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
