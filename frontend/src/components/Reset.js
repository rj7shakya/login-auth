import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { isAuthenticated } = authContext;

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
    if (password === "") {
      toast.error("please enter the password field", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      // loginUser({
      //   email,
      //   password,
      // });
      if (isAuthenticated) {
        props.history.push("/");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Reset password</h1>
      <form action="" onSubmit={onSubmit}>
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
          value="Reset password"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
