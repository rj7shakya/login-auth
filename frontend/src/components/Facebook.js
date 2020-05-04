import React, { createContext } from "react";
import AuthContext from "../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const Facebook = () => {
  const authContext = createContext(AuthContext);
  const { facebooklogin } = authContext;

  const responseFacebook = (response) => {
    console.log(response);
    let user = {
      userID: response.userID,
      accessToken: response.accessToken,
    };
    // facebooklogin(user);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post("api/facebook", user, config)
      .then((res) => {
        console.log("signing ");
        //inform parent @todo
      })
      .catch((e) => {
        console.log("error signing in ", e);
      });
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
