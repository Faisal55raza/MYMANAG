import React, { useContext } from "react";
import SignUp from "../Components/Auth/SignUp";
import Compose from "../Components/Compose/Compose";
import AuthContext from "../Context/AuthContext";
export default function ComposePage() {
  const { isUser } = useContext(AuthContext);
  return (
    <React.Fragment>
      {!isUser && <SignUp />}
      {isUser && <Compose />}
    </React.Fragment>
  );
}
