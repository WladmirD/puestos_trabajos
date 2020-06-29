import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Jobdetails from "./pages/jobdetails"

import WorkStation from "./pages/workStation.js";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/workStation">
        <WorkStation />
      </Route>
      <Route exact path="/jobdetails">
        <Jobdetails />
      </Route>


      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}