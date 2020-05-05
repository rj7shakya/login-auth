import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "../xtra/setAuthToken";

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { user: u, updateUser, isAuthenticated } = authContext;

  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/home");
    } else {
      props.history.push("/login");
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setUser(user);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    u && (user.name = u.name);
    u && (user.email = u.email);
  }, [u]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const { name, email } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "" || email === "") {
      toast.error("please enter all fields ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!re.test(email)) {
      toast.error("please enter a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      u.name = user.name;
      u.email = user.email;
      updateUser(u);
      // if (isAuthenticated) {
      //   props.history.push("/home");
      // }
    }
  };

  return (
    <div className="form-container">
      <h1> User details</h1>
      <div> </div>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <Link to="/forget">Update password ?</Link>
        <input
          type="submit"
          value="Update profile"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Home;
