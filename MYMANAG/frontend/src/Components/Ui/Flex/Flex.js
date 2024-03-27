import React from "react";
import Classes from "./Flex.module.css";
export default function Flex(props) {
  return (
    <div
      className={Classes.FlexBox + " " + props.className}
      onClick={props.onClick}
      style={props.style}
      id={props.id}
    >
      {props.children}
    </div>
  );
}
