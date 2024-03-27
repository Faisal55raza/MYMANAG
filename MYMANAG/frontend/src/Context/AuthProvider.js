import React from "react";
import { useReducer } from "react";
import AuthContext from "./AuthContext";
const defaultState = {
  isUser: localStorage.getItem("isUser") || false,
  User: JSON.parse(localStorage.getItem("User")) || null,
  isFetching: false,
  Error: false,
  ErrorMessage: "",
};
const HandelReducer = (state, action) => {
  if (action.type === "fetching") {
    return {
      isUser: null,
      User: null,
      isFetching: true,
      Error: false,
    };
  } else if (action.type === "Register") {
    localStorage.clear();
    localStorage.setItem("isUser", true);
    localStorage.setItem("User", JSON.stringify(action.User));
    return {
      isUser: true,
      User: action.User,
      isFetching: false,
      Error: false,
    };
  } else if (action.type === "LogIn") {
    localStorage.clear();
    localStorage.setItem("isUser", true);
    localStorage.setItem("User", JSON.stringify(action.User));
    return {
      isUser: true,
      User: action.User,
      isFetching: false,
      Error: false,
    };
  } else if (action.type === "Logout") {
    localStorage.clear();
    window.location.reload();
    return {
      isUser: false,
      User: null,
      isFetching: false,
      Error: false,
    };
  } else if (action.type === "error") {
    return {
      isUser: state.isUser,
      User: state.User,
      isFetching: false,
      Error: true,
      ErrorMessage: action.ErrorMessage,
    };
  } else if (action.type === "UserUpdate") {
    localStorage.clear();
    localStorage.setItem("isUser", true);
    localStorage.setItem("User", JSON.stringify(action.newUser));
    return {
      isUser: true,
      User: action.newUser,
      isFetching: false,
      Error: false,
      ErrorMessage: "",
    };
  }
  return defaultState;
};
function AuthProvider(props) {
  const [state, dispatch] = useReducer(HandelReducer, defaultState);
  const LogIn = (User) => {
    return dispatch({
      type: "LogIn",
      User: User,
    });
  };
  const Register = (User) => {
    return dispatch({
      type: "Register",
      User: User,
    });
  };
  const Logout = () => {
    return dispatch({
      type: "Logout",
    });
  };
  const Fetching = () => {
    return dispatch({
      type: "fetching",
    });
  };
  const AuthError = (ErrorMessage) => {
    dispatch({
      type: "error",
      ErrorMessage: ErrorMessage,
    });
  };
  const UpdateUser = (User) => {
    dispatch({
      type: "UserUpdate",
      newUser: User,
    });
  };
  const ContextValue = {
    isUser: state.isUser,
    User: state.User,
    isFetching: state.isFetching,
    Error: state.Error,
    ErrorMessage: state.ErrorMessage,
    Register: Register,
    LogIn: LogIn,
    LogOut: Logout,
    Fetching: Fetching,
    AuthError: AuthError,
    UpdateUser: UpdateUser,
  };
  return (
    <AuthContext.Provider value={ContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
