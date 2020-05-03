import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import { toast } from "react-toastify";
import axios from "axios";
import setAuthToken from "../xtra/setAuthToken";

import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
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
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // set current contact
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // clear current contact
  const clearCurrent = (contact) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //update user
  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.put(`api/users/${user._id}`, user, config);
      dispatch({ type: UPDATE_SUCCESS, payload: res.data });
      toast.success("update success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      // loadUser();
    } catch (err) {
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response.data.msg,
      });
      if (err.response.data.msg === "Not authorized") {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Server error", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

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
      toast.success("signup success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      loadUser();
      // return;
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response,
      });
      console.log(err.response);
      if (err.response.data.msg === "User already exists!") {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Server error", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
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
      const res = await axios.post("api/auth", form, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      toast.success("login success", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response,
      });
      if (err.response.data.msg === "Invalid credentials") {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Server error", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };

  //logout
  const logoutUser = () => dispatch({ type: LOGOUT });

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
        updateUser,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
