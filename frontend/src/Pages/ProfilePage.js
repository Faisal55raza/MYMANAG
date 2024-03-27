import React, { useContext } from "react";
import Profile from "../Components/Profile/Profile";
import AuthContext from "../Context/AuthContext";
import SignIn from "../Components/Auth/SignIn";
function ProfilePage() {
  const { isUser } = useContext(AuthContext);
  return (
    <React.Fragment>
      {isUser && <Profile />}
      {!isUser && <SignIn />}
    </React.Fragment>
  );
}

export default ProfilePage;
