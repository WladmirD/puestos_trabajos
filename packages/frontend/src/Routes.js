import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Jobdetails from "./pages/jobdetails"
import F1 from "./pages/F1";
import Admin from './pages/Admin';

import WorkStation from "./pages/workStation.js";
import SignUp from './pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signUp">
      <SignUp/>
      </Route>
      <Route exact path="/F1">
        <F1 />
      </Route>

      <Route exact path="/workStation">
        <WorkStation />
      </Route>
      <Route exact path="/jobdetails">
        <Jobdetails />
      </Route>
    <Route exact path="/admin">
    <Admin />
    </Route>


      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}