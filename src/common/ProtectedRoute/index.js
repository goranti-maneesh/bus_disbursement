import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

import Login from "../../components/Login";

const ProtectedRoute = (props) => {
  const JWTtoken = Cookies.get("Bus_disbursement_JWT_token");

  if (JWTtoken === undefined) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
