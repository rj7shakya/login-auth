import React, { useReducer } from "react";
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
  FORGET_PASSWORD,
  RESET_PASSWORD,
  UPDATE_FAIL,
  GOOGLE_LOGIN,
} from "./actions";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    url: null,
    newPassword: null,
    resetPasswordLink: null,
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

  //forget password
  const forgetpw = async (user) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.put("api/forget", user, config);
      console.log("sending");
      // console.log(res);
      dispatch({ type: FORGET_PASSWORD, payload: res.data });
    } catch (error) {
      return "Server error";
    }
  };

  //reset password
  const resetpw = async (user) => {
    // eslint-disable-next-line
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    axios({
      // .put("api/reset", user, config)
      method: "PUT",
      url: "http://localhost:3000/api/reset",
      data: user,
    })
      .then((res) => {
        dispatch({ type: RESET_PASSWORD, payload: res.data });
      })
      .catch((err) => {
        console.log("error");
      });
  };

  //google login
  const googlelogin = async (user) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      // const res = await axios.put("api/google", user, config);
      console.log("sending");
      // console.log(res);
      // dispatch({ type: GOOGLE_LOGIN, payload: res.data });
    } catch (error) {
      return "Server error";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        url: state.url,
        signup,
        loginUser,
        logoutUser,
        loadUser,
        updateUser,
        setCurrent,
        clearCurrent,
        forgetpw,
        resetpw,
        googlelogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
