import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser, user } = authContext;

  return (
    <div className="navbar ">
      <h1>{title}</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Login here",
};

export default Navbar;
