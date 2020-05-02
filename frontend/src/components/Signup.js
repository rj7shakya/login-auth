import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const Signup = () => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { signup, error, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

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
      console.log("please enter all fields ");
    } else if (password !== password2) {
      console.log("password do not match");
    } else if (!re.test(email)) {
      console.log("please enter a valid email");
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
