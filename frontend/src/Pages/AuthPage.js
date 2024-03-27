import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SignIn from "../Components/Auth/SignIn";
import SignUp from "../Components/Auth/SignUp";
import AuthContext from "../Context/AuthContext";
import ProfilePage from "./ProfilePage";

export default function AuthPage() {
  const params = useParams();
  const { isUser } = useContext(AuthContext);
  return (
    <React.Fragment>
      {!isUser ? (
        params.Method === "SignIn" ? (
          <SignIn />
        ) : (
          <SignUp />
        )
      ) : (
        <ProfilePage />
      )}
    </React.Fragment>
  );
}
