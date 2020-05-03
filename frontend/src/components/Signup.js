import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const { signup, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/login");
    }
  }, [isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "" || password === "" || email === "") {
      toast.error("please enter all fields ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (password !== password2) {
      toast.error("password do not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!re.test(email)) {
      toast.error("please enter a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      signup({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Register a user</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="signup"
          className="btn btn-primary btn-block"
        />
        <div className="or">Or </div>
        <button className="btn btn-primary btn-block p-2">
          Sign up with google
        </button>
        <button className="btn btn-primary btn-block">
          Sign up with facebook
        </button>
      </form>
    </div>
  );
};

export default Signup;
