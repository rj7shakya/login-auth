import React, { createContext, useEffect, useContext } from "react";
import AuthContext from "../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import setAuthToken from "../xtra/setAuthToken";

const Facebook = (props) => {
  const authContext = useContext(AuthContext);
  const { facebooklogin, loginUser, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history && props.history.push("/home");
    } else {
      props.history && props.history.push("/login");
    }
  }, [isAuthenticated, props.history]);

  const responseFacebook = (response) => {
    let user = {
      userID: response.userID,
      accessToken: response.accessToken,
    };
    facebooklogin(user);
  };

  return (
    <FacebookLogin
      appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className="btn btn-primary btn-block"
        >
          <i className="fa fa-facebook p2"></i>
          Sign up with facebook
        </button>
      )}
    />
  );
};

export default Facebook;
