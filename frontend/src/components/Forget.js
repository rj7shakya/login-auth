import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { forgetpw, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
  });
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     props.history.push("/home");
  //   } else {
  //     props.history.push("/login");
  //   }
  // }, [isAuthenticated]);

  const { email } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      toast.error("please enter a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      console.log(forgetpw({ email }));
    }
  };

  return (
    <div className="form-container">
      <h1>Forget password?</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <input
          type="submit"
          value="Get Link"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
