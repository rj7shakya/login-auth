import { createContext, useReducer } from "react";
import { SIGNUP_SUCCESS } from "./actions";

export const UserContext = createContext();

const AuthContext = () => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user

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

  //logout

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

export default AuthContext;
