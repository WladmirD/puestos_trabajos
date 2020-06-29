import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import WorkStation from "./pages/workStation.js";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/workStation">
        <WorkStation />
      </Route>
      
    </Switch>
  );
}