import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Login from "../../components/Login";
import { BookingContext } from "../../context/context";
import { isLoggedIn } from "../../common/auth";

const ProtectedRoute = (props) => {
  const { studentData } = useContext(BookingContext);

  if (isLoggedIn(studentData)) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
