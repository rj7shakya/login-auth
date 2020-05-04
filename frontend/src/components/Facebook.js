import React, { createContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import setAuthToken from "../xtra/setAuthToken";

const Facebook = (props) => {
  const authContext = createContext(AuthContext);
  const { facebooklogin, loginUser, isAuthenticated } = authContext;
  console.log(loginUser);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/home");
    } else {
      props.history && props.history.push("/login");
    }
  }, [isAuthenticated, props.history]);

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
        console.log(res.data);
        setAuthToken(res.data.token);
        console.log(loginUser);
        loginUser({ email: res.data.user.email, name: res.data.user.name });
        if (isAuthenticated) {
          props.history.push("/home");
        }
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
