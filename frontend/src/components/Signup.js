import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

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
    if (name === "" || password === "" || email === "") {
      console.log("please enter all fields ");
    } else if (password !== password2) {
      console.log("password do not match");
    } else {
      signup({ name, email, password });
    }
  };

  return (
    <div className="form">
      <h1>Register a user</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input type="submit" value="signup" />
      </form>
    </div>
  );
};

export default Signup;
