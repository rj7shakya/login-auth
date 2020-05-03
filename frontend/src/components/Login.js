import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { loginUser, error, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/home");
    } else {
      props.history.push("/login");
    }
  }, [isAuthenticated]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password === "" || email === "") {
      toast.error("please enter all fields ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!re.test(email)) {
      toast.error("please enter a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      loginUser({
        email,
        password,
      });
      if (isAuthenticated) {
        props.history.push("/");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Login a user</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
      <div className="or">Or </div>
      <div className="dont">
        Dont have an account{" "}
        <Link className="l1" to="/">
          Signup
        </Link>
      </div>
      <div className="or m1">
        <a className="or" href="">
          forget password
        </a>
      </div>
    </div>
  );
};

export default Login;
