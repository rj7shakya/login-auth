import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";

import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actions";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user
  const loadUser = () => {};

  //signup user
  const signup = async (form) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("api/users", form, config);
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  //login
  const loginUser = async (form) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      console.log(form);
      const res = await axios.post("api/auth", form, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //logout
  const logoutUser = () => {};

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        signup,
        loginUser,
        logoutUser,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
