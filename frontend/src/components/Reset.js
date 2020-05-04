import React, { useState, useContext, useEffect } from "react";
import jwt from "jsonwebtoken";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = ({ match }) => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { isAuthenticated, resetpw } = authContext;

  const [user, setUser] = useState({
    token: "",
    newPassword: "",
    name: "",
  });
  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setUser({ ...user, name, token });
    }
  }, []);

  const { token, newPassword, name } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      newPassword: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword === "") {
      toast.error("please enter the password field", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newPassword.length < 6) {
      toast.error("password should be 6 character or long", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      resetpw({
        newPassword,
        resetPasswordLink: token,
      });
      // if (isAuthenticated) {
      //   props.history.push("/");
      // }
    }
  };

  return (
    <div className="form-container">
      <h1>{name} Reset password</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={newPassword}
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

export default Reset;
