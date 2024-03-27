import React, { useContext } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Home.module.css";
import Logo from "../../Assets/Logo.png";
import Pic from "../../Assets/Pic1.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
function Home() {
  const { isUser, User } = useContext(AuthContext);
  return (
    <Flex className={Classes.Home}>
      <div className={Classes.Home__Left}>
        <img src={Logo} alt="HomeLogo" />
        <p>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </p>
        {!isUser && (
          <Link to="/Auth/SignUp" className="link">
            <Button variant="contained" color="secondary">
              Get Started
            </Button>
          </Link>
        )}
        {isUser && (
          <Link to="/compose" className="link">
            <span>{User.UserName} Share Your thoughts </span>
            <Button variant="contained" color="secondary">
              Start Writing
            </Button>
          </Link>
        )}
      </div>
      <div className={Classes.Home__Right}>
        <img src={Pic} alt="AnimatedPic" />
      </div>
    </Flex>
  );
}

export default Home;
