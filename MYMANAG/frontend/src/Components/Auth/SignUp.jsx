import React, { useContext, useEffect, useState } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Auth.module.css";
import Signup from "../../Assets/SignUp.png";
import { Button } from "@material-ui/core";
import AuthContext from "../../Context/AuthContext";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";
export default function SignUp() {
  // AuthContext Api
  const { Error, ErrorMessage, Fetching, AuthError } = useContext(AuthContext);
  useEffect(() => {
    AuthError("");
  }, []);
  // SignUp Hook
  const { SignUp, Loading } = useApi();

  const [hide, updateHide] = useState(true);
  const [PasswordType, updateType] = useState("password");
  const HandelClick = () => {
    if (hide) {
      updateHide(false);
      updateType("text");
    } else {
      updateHide(true);
      updateType("password");
    }
  };
  const [UserName, updateUserName] = useState("");
  const [Password, updatePassword] = useState("");
  const [ConfirmPassword, updateConfirmPassword] = useState("");
  const [Email, updateEmail] = useState("");
  const HandelUserNameChange = (event) => {
    updateUserName(event.target.value);
  };
  const HandelEmailChange = (event) => {
    updateEmail(event.target.value);
  };
  const HandelPasswordChange = (event) => {
    updatePassword(event.target.value);
  };
  const HandelConfirmPasswordChange = (event) => {
    updateConfirmPassword(event.target.value);
  };
  const HandelSubmit = (event) => {
    Fetching();
    event.preventDefault();
    if (Password === ConfirmPassword) {
      AuthError("Loading....");
      SignUp({ UserName: UserName, Email: Email, Password: Password });
    } else {
      AuthError("Confirm Password Not Matched");
    }
  };
  return (
    <Flex className={Classes.Auth__Box}>
      <form className={Classes.Auth__Left} onSubmit={HandelSubmit}>
        {Error && <span className={Classes.Error}>{ErrorMessage}</span>}
        <input
          required={true}
          type="text"
          placeholder="UserName"
          value={UserName}
          onChange={HandelUserNameChange}
        />
        <input
          required={true}
          type="email"
          placeholder="Email"
          value={Email}
          onChange={HandelEmailChange}
        />

        <div>
          <input
            required={true}
            type={PasswordType}
            placeholder="Password"
            value={Password}
            onChange={HandelPasswordChange}
          />
          {hide && (
            <span
              className={Classes.See}
              onClick={HandelClick}
              onChange={HandelConfirmPasswordChange}
            >
              <i className="fas fa-eye"></i>
            </span>
          )}
          {!hide && (
            <span
              className={Classes.See + " " + Classes.Hide}
              onClick={HandelClick}
            >
              <i className="fas fa-eye-slash"></i>
            </span>
          )}
        </div>
        <div>
          <input
            required={true}
            type={PasswordType}
            placeholder="Confirm Password"
            value={ConfirmPassword}
            onChange={HandelConfirmPasswordChange}
          />
          {hide && (
            <span className={Classes.See} onClick={HandelClick}>
              <i className="fas fa-eye"></i>
            </span>
          )}
          {!hide && (
            <span
              className={Classes.See + " " + Classes.Hide}
              onClick={HandelClick}
            >
              <i className="fas fa-eye-slash"></i>
            </span>
          )}
        </div>
        {Loading && <Loader />}
        {!Loading && (
          <Button variant="contained" color="secondary" type="submit">
            Sign Up
          </Button>
        )}
      </form>
      <div className={Classes.Auth__Right}>
        <img src={Signup} alt="LoginImage" />
      </div>
    </Flex>
  );
}
