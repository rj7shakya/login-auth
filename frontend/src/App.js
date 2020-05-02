import React, { Fragment } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "./App.css";
import AuthState from "./context/AuthState";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path='/' component={}/> */}
              <Redirect to="/" />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
