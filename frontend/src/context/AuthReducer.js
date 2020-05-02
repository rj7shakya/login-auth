import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "./actions";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {};

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {};

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {};

    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {};

    case LOGOUT:
      localStorage.removeItem("token");
      return {};

    case CLEAR_ERRORS:
      return {};

    case USER_LOADED:
      return {};

    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {};

    default:
      return state;
  }
};
