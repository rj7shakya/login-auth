import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { loginUser, error, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "" || email === "") {
      console.log("please enter all fields ");
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  return (
    <div className="form">
      <h1>Login a user</h1>
      <form action="" onSubmit={onSubmit}>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
