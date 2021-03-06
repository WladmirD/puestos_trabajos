import React, { useState } from "react";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div className="App container">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user, setUser }}>
  <Routes />
</AppContext.Provider>
    </div>
  );
}

export default App;