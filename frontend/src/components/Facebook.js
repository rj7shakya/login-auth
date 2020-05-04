import React, { createContext } from "react";
import AuthContext from "../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Facebook = () => {
  const authContext = createContext(AuthContext);
  // const { googlelogin } = authContext;

  const responseFacebook = (response) => {
    console.log(response);
    // googlelogin({ idToken: response.tokenId });
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
