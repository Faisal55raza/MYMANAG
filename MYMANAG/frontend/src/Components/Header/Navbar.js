import React, { useContext } from "react";
import Classes from "./Navbar.module.css";
import Header__Logo from "../../Assets/Header-Logo.png";
import Flex from "../Ui/Flex/Flex";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
function Navbar() {
  const PublicFolder = "http://localhost/Images/";

  const { isUser, User } = useContext(AuthContext);
  console.log(User);
  return (
    <Flex className={Classes.Navbar}>
      <Link to="/" className={Classes.Header__Left}>
        <img
          src={Header__Logo}
          alt="Header-Logo"
          className={Classes.Header__Logo__Img}
        />
      </Link>
      <Flex className={Classes.Header__Centre}>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/" className="link">
          Articles
        </Link>
        {isUser && (
          <Link to="/compose" className={Classes.Compose__btn + " link"}>
            <i className="fas fa-pen"></i>
            &nbsp; Compose
          </Link>
        )}
      </Flex>
      {isUser && (
        <Flex className={Classes.Header__Right}>
          <Link to="/profile" className="link">
            <img src={PublicFolder + User.ProfileImage} alt="ProfileImage" />
          </Link>
        </Flex>
      )}

      {!isUser && (
        <Flex className={Classes.Header__Right}>
          <Link to="/Auth/SignIn" className="link">
            <Button className={Classes.btn}>Sign In</Button>
          </Link>
          <Link to="/Auth/SignUp" className="link">
            <Button
              variant="contained"
              color="secondary"
              className={Classes.btn}
            >
              Sign Up
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}

export default Navbar;
