import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

const Navbar = (props) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logoutUser, clearCurrent } = authContext;

  const onLogout = () => {
    logoutUser();
    clearCurrent();
    localStorage.removeItem("token");
    // props.history && props.history.push("/login");
  };

  return (
    <div className="navbar ">
      <h1>{props.title}</h1>
      {isAuthenticated ? (
        <ul>
          <li>
            <Link to="/home">Home </Link>
          </li>
          <a onClick={onLogout} href="#!">
            <span className="hide-sm">Logout</span>
          </a>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

Navbar.defaultProps = {
  title: "Login here",
};

export default Navbar;
