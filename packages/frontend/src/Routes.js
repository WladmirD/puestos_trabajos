import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
  <Login />
</Route>
      {/* Finally, catch all unmatched routes */}
    <Route>
        <NotFound />
    </Route>
    </Switch>
  );
}