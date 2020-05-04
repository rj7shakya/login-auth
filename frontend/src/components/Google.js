import React, { createContext } from "react";
import AuthContext from "../context/authContext";
import GoogleLogin from "react-google-login";

const Google = () => {
  const authContext = createContext(AuthContext);
  const { googlelogin } = authContext;

  const responseGoogle = (response) => {
    console.log(response);
    // googlelogin({ idToken: response.tokenId });
  };

  return (
    // <div className="form-container">
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="btn btn-primary btn-block"
        >
          <i className="fa fa-google p2"></i>
          Signup with google
        </button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
    // </div>
  );
};

export default Google;
