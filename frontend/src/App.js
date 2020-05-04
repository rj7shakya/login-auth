import React, { Fragment } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { toast } from "react-toastify";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./xtra/setAuthToken";

import "./App.css";
import AuthState from "./context/AuthState";
import Forget from "./components/Forget";
import Reset from "./components/Reset";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Facebook from "./components/Facebook";
import Google from "./components/Google";
console.log(localStorage.token);
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

toast.configure();

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <div className="container">
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <Route exact path="/" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/auth/reset/:token" component={Reset} />
              {/* <Route exact path='/' component={}/> */}
              <Route exact path="/" component={Google} />
              <Route exact path="/" component={Facebook} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
