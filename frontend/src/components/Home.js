import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { user: u, updateUser, isAuthenticated } = authContext;

  return (
    <div>
      <h1>Profile page</h1>
      <h1>{u && u.email}</h1>
    </div>
  );

  // useEffect(() => {
  //   authContext.loadUser();
  // }, []);

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     props.history.push("/login");
  //     setUser({
  //       name: "",
  //       email: "",
  //       password: "",
  //     });
  //   } else {
  //     setUser(user);
  //     // if (user !== undefined) {
  //     //   user.name = u.name;
  //     //   user.email = u.email;
  //     // }

  //     // isAuthenticated = true;
  //   }
  // }, [isAuthenticated, props.history]);

  // useEffect(() => {
  //   authContext.loadUser();
  //   console.log(u);
  //   u && setUser(u.name, u.email);
  // }, []);

  // console.log(user);

  // const onChange = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const { name, email, password } = user;

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (name === "" || email === "") {
  //     toast.error("please enter all fields ", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   } else if (!re.test(email)) {
  //     toast.error("please enter a valid email", {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   } else {
  //     u.name = user.name;
  //     u.email = user.email;
  //     updateUser(u);
  //   }
  // };

  // return (
  //   <div className="form-container">
  //     <h1> User details</h1>
  //     <div> </div>
  //     <form action="" onSubmit={onSubmit}>
  //       <div className="form-group">
  //         <label htmlFor="name">Name</label>
  //         <input type="text" name="name" value={name} onChange={onChange} />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="email">Email</label>
  //         <input type="text" name="email" value={email} onChange={onChange} />
  //       </div>
  //       <a href="#"> Update password ? </a>
  //       <input
  //         type="submit"
  //         value="Update profile"
  //         className="btn btn-primary btn-block"
  //       />
  //     </form>
  //   </div>
  // );
};

export default Home;
