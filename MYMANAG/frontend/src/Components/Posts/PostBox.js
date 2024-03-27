import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Post from "../Post/Post";
import SideBar from "../SideBar/SideBar";
import Flex from "../Ui/Flex/Flex";
import Classes from "./PostBox.module.css";
function PostBox(props) {
  const { isUser, User } = useContext(AuthContext);
  return (
    <Flex className={Classes.Container} id="Article">
      <Flex className={Classes.PostBox}>
        {isUser ? (
          <div className={Classes.Heading}>
            <h1>Hey {User.UserName},</h1>
            <h3>We have Some Articles for You</h3>
          </div>
        ) : (
          <h1>Articles</h1>
        )}
        {props.data.map((PostData, index) => {
          return <Post PostData={PostData} id={PostData._id} key={index} />;
        })}
      </Flex>
      <SideBar />
    </Flex>
  );
}

export default PostBox;
