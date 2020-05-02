import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Bubbles from "./components/BubblePage";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute
            exact
            path="/bubbles"
            component={Bubbles}
            setIsLoggedIn={""}
            isLoggedIn={""}
          />
          <Route path="/login" render={(props) => <Login {...props} />} />

          <Redirect to="login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
