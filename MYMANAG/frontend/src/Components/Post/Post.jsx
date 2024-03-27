import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Classes from "./Post.module.css";
function Post(props) {
  const RandomImageUrl = `https://source.unsplash.com/1600x900/?${
    (props.PostData.Category[0],
    props.PostData.Category[1],
    props.PostData.Category[2])
  }`;
  const PublicFolder = "http://localhost/Images/";
  return (
    <div className={Classes.Post}>
      {props.PostData.PostImage ? (
        <img src={PublicFolder + props.PostData.PostImage} alt="PostImage" />
      ) : (
        <img src={RandomImageUrl} alt="PostImage" />
      )}
      <Link
        to={`/Article/${props.PostData._id}`}
        className={Classes.Title + " link"}
      >
        {props.PostData.Title}
      </Link>
      <div className={Classes.Desc}>{props.PostData.Description}</div>
      <hr />
      <div className={Classes.Info}>
        <div>
          <i className="fas fa-user"></i> :{" "}
          <strong>{props.PostData.AuthorName}</strong>
        </div>
        <div>
          <i className="fas fa-clock"></i> :{" "}
          {new Date(props.PostData.createdAt).toDateString()}
        </div>
        <div>
          Category:
          {props.PostData.Category.map((cat, index) => {
            return <span key={index}>{cat} | </span>;
          })}
        </div>
      </div>
      <hr />
      <div className={Classes.Article}>{props.PostData.Article}</div>
      <Link to={`/Article/${props.PostData._id}`} className="link">
        {" "}
        <Button variant="contained" color="secondary">
          Read More
        </Button>
      </Link>
    </div>
  );
}

export default Post;
