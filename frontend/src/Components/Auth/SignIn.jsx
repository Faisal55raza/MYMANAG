import React, { useContext, useEffect, useState } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Auth.module.css";
import Login from "../../Assets/Login.png";
import { Button } from "@material-ui/core";
import useApi from "../../Hooks/useApi";
import AuthContext from "../../Context/AuthContext";
export default function SignIn() {
  const { SignIn } = useApi();
  const [hide, updateHide] = useState(true);
  const [PasswordType, updateType] = useState("password");
  const { Error, ErrorMessage, AuthError } = useContext(AuthContext);
  useEffect(() => {
    AuthError("");
  }, []);
  const HandelClick = () => {
    if (hide) {
      updateHide(false);
      updateType("text");
    } else {
      updateHide(true);
      updateType("password");
    }
  };
  const [Email, updateEmail] = useState("");
  const [Password, updatePassword] = useState("");
  const HandelEmailChange = (event) => {
    updateEmail(event.target.value);
  };
  const HandelPasswordChange = (event) => {
    updatePassword(event.target.value);
  };
  const HandelSubmit = (event) => {
    AuthError("");
    event.preventDefault();
    SignIn({ Email: Email, Password: Password });
  };
  return (
    <Flex className={Classes.Auth__Box}>
      <form className={Classes.Auth__Left} onSubmit={HandelSubmit}>
        {Error && <span className="Message">{ErrorMessage}</span>}
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
            <span className={Classes.See} onClick={HandelClick}>
              <i className="fas fa-eye"></i>
            </span>
          )}
          {!hide && (
            <span
              className={Classes.See + " " + Classes.Hide}
              onClick={HandelClick}
            >
              <i class="fas fa-eye-slash"></i>
            </span>
          )}
        </div>
        <Button variant="contained" color="secondary" type="submit">
          Sign In
        </Button>
      </form>
      <div className={Classes.Auth__Right}>
        <img src={Login} alt="LoginImage" />
      </div>
    </Flex>
  );
}
