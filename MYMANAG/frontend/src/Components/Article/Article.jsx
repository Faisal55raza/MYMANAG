import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import useApi from "../../Hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Article.module.css";
function Article(props) {
  const { DeleteData } = useApi();
  const { isUser, User } = useContext(AuthContext);
  const ArticleData = props.data[0];
  const RandomImageUrl = `https://source.unsplash.com/1600x900/?${
    (ArticleData.Category[0], ArticleData.Category[1], ArticleData.Category[2])
  }`;
  const PublicFolder = "http://localhost/Images/";
  const DeleteArticle = () => {
    DeleteData(`Post/delete/${User._id}/${ArticleData._id}`);
  };

  return (
    <React.Fragment>
      <div className={Classes.Article}>
        {ArticleData.PostImage ? (
          <img src={PublicFolder + ArticleData.PostImage} alt="PostImage" />
        ) : (
          <img src={RandomImageUrl} alt="PostImage" />
        )}

        {isUser && User._id === ArticleData.UserId && (
          <div className={Classes.User__btn}>
            <Link to={"/Edit/" + ArticleData._id}>
              <i className="fas fa-edit"></i>
            </Link>
            <i className="fas fa-trash-alt" onClick={DeleteArticle}></i>
          </div>
        )}
        <div className={Classes.Title}>{ArticleData.Title}</div>
        <hr />
        <Flex className={Classes.Info}>
          <div>
            <i className="fas fa-user"></i> :{" "}
            <strong>{ArticleData.AuthorName}</strong>
          </div>
          <div>
            <i className="fas fa-clock"></i> :{" "}
            {new Date(ArticleData.createdAt).toDateString()}
          </div>
          <div>
            Category:
            {ArticleData.Category.map((cat, index) => {
              return <span key={index}>{cat} | </span>;
            })}
          </div>
        </Flex>
        <hr />
        <div className={Classes.Para}>{ArticleData.Article}</div>
      </div>
    </React.Fragment>
  );
}

export default Article;
