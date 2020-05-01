import { createContext, useState } from "react";

export const UserContext = React.createContext();

const AuthContext = () => {
  const [uState, setuState] = useState({
    token: localStorage.getItem(""),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  });

  return (
    <AuthContext.Provider
      value={{
        token: uState.token,
        isAuthenticated: uState.isAuthenticated,
        loading: uState.loading,
        user: uState.user,
        error: uState.error,
        register,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
