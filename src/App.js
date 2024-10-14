import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { BookingContext } from "./context/context";
import Login from "./components/Login";
import BusListing from "./components/BusListing";
import Booking from "./components/Booking";
import ProtectedRoute from "./common/ProtectedRoute";

const App = () => {
  const { studentData, setStudentData, busData, setBusData } = useContext(
    BookingContext
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/buses" component={BusListing} />
          <ProtectedRoute path="/booking/:busID" component={Booking} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
