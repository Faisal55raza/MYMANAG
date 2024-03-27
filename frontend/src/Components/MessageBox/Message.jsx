import React from "react";
import Classes from "./Message.module.css";
function Message(props) {
  return (
    <div className={Classes.MessageBox}>
      {props.Message}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam iste iusto
      ullam quasi dignissimos nulla provident delectus placeat vel fugiat natus,
      omnis, tenetur voluptatem. Beatae repellendus quas at necessitatibus
      animi.
    </div>
  );
}

export default Message;
