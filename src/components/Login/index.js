import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { deployedApiUrl, developmentApiUrl } from "../../common";
import { BookingContext } from "../../context/context";

import "./index.css";

const Login = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setStudentData } = useContext(BookingContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${deployedApiUrl}/api/login`, {
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
        Cookies.set("Bus_disbursement_JWT_token", data.token, { expires: 1 });
        history.push("/buses");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const JWTtoken = Cookies.get("Bus_disbursement_JWT_token");

    if (JWTtoken === undefined) {
      history.push("/login");
    }
  });

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
