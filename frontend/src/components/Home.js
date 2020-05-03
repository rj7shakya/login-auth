import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { updateUser, isAuthenticated, user: u } = authContext;

  useEffect(() => {
    authContext.loadUser();
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setUser(u);
    }
  }, [isAuthenticated, props.history]);

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
    } else if (!re.test(email)) {
      toast.error("please enter a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      updateUser(user);
    }
  };

  return (
    <div className="form-container">
      <h1>{u && u.name}, Update a user</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <a href="#"> Update password ? </a>
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
