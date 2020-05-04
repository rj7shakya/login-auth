import React, { createContext } from "react";
import AuthContext from "../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Facebook = () => {
  const authContext = createContext(AuthContext);
  const { googlelogin } = authContext;

  const responseFacebook = (response) => {
    console.log(response);
    googlelogin({ idToken: response.tokenId });
  };

  return (
    // <div className="form-container">
    <FacebookLogin
      appId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className="btn btn-primary btn-block"
        >
          <i className="fa fa-google p2"></i>
          Sign up with facebook
        </button>
      )}
    />
    // </div>
  );
};

export default Facebook;
