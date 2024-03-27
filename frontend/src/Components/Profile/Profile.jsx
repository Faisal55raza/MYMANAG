import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Profile.module.css";
function Profile() {
  const PublicFolder = "http://localhost/Images/";
  const { User, Error, ErrorMessage, LogOut, AuthError } =
    useContext(AuthContext);
  const HandelLogOut = () => {
    LogOut();
  };
  const { Profile, Loading, PostData, Delete } = useApi();
  const [File, updateFile] = useState(null);
  const [WantPasswordChange, setChoice] = useState(false);
  const [UserName, updateUserName] = useState(User.UserName);
  const [Email, updateEmail] = useState(User.Email);
  const [About, updateAbout] = useState(User.About);
  const [Password, updatePassword] = useState("");
  const [ConfirmPassword, UpdateConfirmPassword] = useState("");

  const HandelUserNameChange = (event) => {
    updateUserName(event.target.value);
  };
  const HandelEmailChange = (event) => {
    updateEmail(event.target.value);
  };
  const HandelAboutChange = (event) => {
    updateAbout(event.target.value);
  };
  const ReqPassChange = () => {
    if (WantPasswordChange) {
      setChoice(false);
    } else {
      setChoice(true);
    }
  };
  const HandelChangePass = (event) => {
    updatePassword(event.target.value);
  };
  const HandelConfPass = (event) => {
    UpdateConfirmPassword(event.target.value);
  };
  const HandelSubmit = (event) => {
    AuthError("");

    event.preventDefault();
    WantPasswordChange
      ? Password === ConfirmPassword
        ? Profile(User._id, {
            UserId: User._id,
            UserName: UserName,
            Email: Email,
            About: About,
            Password: Password,
          })
        : AuthError("Confirm Password Not Matched")
      : Profile(User._id, {
          UserId: User._id,
          UserName: UserName,
          Email: Email,
          About: About,
        });
  };
  const HandelProfilePicChange = (event) => {
    event.preventDefault();
    let FileName;
    if (File !== null) {
      const data = new FormData();
      FileName = Date.now() + File.name;
      data.append("FileName", FileName);
      data.append("file", File);
      PostData("Upload", data);
    }
    Profile(User._id, {
      UserId: User._id,
      ProfileImage: FileName,
    });
  };
  const HandelDeleteAccount = (event) => {
    console.log(User._id);
    Delete(`Update/${User._id}`);
    localStorage.clear();
    window.location.replace("/");
  };
  return (
    <Flex className={Classes.Profile}>
      <div className={Classes.Profile__Left}>
        <br />
        <h1>Your Profile</h1>
        <br />
        <h3>You can Edit your Profile and Save the changes </h3>
        <br />
        <h2 className="Message">{Error && ErrorMessage}</h2>
        <form onSubmit={HandelSubmit}>
          <div>
            <label htmlFor="Name">Name</label>
            <br />
            <input
              type="text"
              id="Name"
              placeholder="Edit Your Name"
              value={UserName}
              onChange={HandelUserNameChange}
            />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <br />

            <input
              type="text"
              id="Email"
              placeholder="Edit Your Email"
              value={Email}
              onChange={HandelEmailChange}
            />
          </div>
          <div>
            <label htmlFor="Bio">About</label>
            <br />

            <textarea
              name="About"
              id="Bio"
              cols="30"
              rows="10"
              placeholder="Your Bio"
              value={About}
              onChange={HandelAboutChange}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="Password"
              className="Message"
              onClick={ReqPassChange}
            >
              {!WantPasswordChange
                ? " Request for Password Change"
                : "Cancel Password Change Request"}
            </label>
            {WantPasswordChange && (
              <React.Fragment>
                <input
                  placeholder="New Password ...."
                  value={Password}
                  onChange={HandelChangePass}
                  required
                />
                <input
                  placeholder="Confirm Password..."
                  value={ConfirmPassword}
                  onChange={HandelConfPass}
                  required
                />
              </React.Fragment>
            )}
          </div>
          <br />
          {Loading && <Loader />}
          {!Loading && (
            <Button variant="contained" color="secondary" type="submit">
              Save &nbsp;&nbsp;&nbsp;&nbsp; <i className="fas fa-save"></i>
            </Button>
          )}
          <br />
        </form>

        <Button
          color="secondary"
          variant="contained"
          className={Classes.btn}
          onClick={HandelDeleteAccount}
        >
          Delete Account
        </Button>
      </div>
      <Flex className={Classes.Profile__Right}>
        <Flex className={Classes.Profile__Box}>
          {File === null ? (
            <img
              src={PublicFolder + User.ProfileImage}
              alt="ProfilePic"
              className={Classes.ProfilePic}
            />
          ) : (
            <img
              src={URL.createObjectURL(File)}
              alt="FileImage"
              className={Classes.ProfilePic}
            />
          )}
          <form onSubmit={HandelProfilePicChange}>
            <label htmlFor="ProfileEdit">
              Edit &nbsp;&nbsp;<i className="fas fa-edit"></i>
            </label>
            <input
              type="file"
              id="ProfileEdit"
              name="Profile__Edit"
              onChange={(e) => {
                updateFile(e.target.files[0]);
              }}
            />
            {File !== null && (
              <Button
                variant="contained"
                color="secondary"
                className="btn"
                type="Submit"
              >
                Save
              </Button>
            )}
          </form>
        </Flex>
        <Flex className={Classes.Container}>
          <div>
            <span className={Classes.Key}>Name</span>
            <span className={Classes.Value}>{User.UserName}</span>
          </div>
          <div>
            <span className={Classes.Key}>Email</span>
            <span className={Classes.Value}>{User.Email}</span>
          </div>

          <div>
            <span className={Classes.Key}>About</span>
            <span className={Classes.Value}>{User.About}</span>
          </div>
        </Flex>
        <Button
          color="secondary"
          variant="contained"
          className="btn"
          onClick={HandelLogOut}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}

export default Profile;
