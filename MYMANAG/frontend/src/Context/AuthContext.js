import React from "react";
const AuthContext = React.createContext({
  isUser: false,
  User: null,
  isFetching: false,
  Error: false,
  ErrorMessage: "",
  Register: (username, email, password) => {},
  LogIn: (email, password) => {},
  LogOut: () => {},
  Fetching: () => {},
  AuthError: () => {},
  UpdateUser: () => {},
});
export default AuthContext;
