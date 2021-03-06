import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Category from './pages/category-table';
import Jobdetails from "./pages/jobdetails"
import CreateJob from "./pages/CreateJob"
import F1 from "./pages/F1";
import Admin from './pages/Admin';
import EditPost from './pages/edit-post-page';

import WorkStation from "./pages/workStation.js";
import SignUp from './pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
          <F1 />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signUp">
      <SignUp/>
      </Route>
      <Route exact path='/category/:category'>
        <Category />
      </Route>
      <Route exact path="/workStation">
        <WorkStation />
      </Route>
      <Route exact path="/jobs/:id">
        <Jobdetails />
      </Route>
      <Route exact path="/jobs/:id/edit" component={EditPost}/>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/createJob" component={CreateJob} />



      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}