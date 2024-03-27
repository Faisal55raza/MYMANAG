import React, { useContext, useState } from "react";
import Classes from "./Compose.module.css";
import Flex from "../Ui/Flex/Flex";
import Button from "@material-ui/core/Button";
import useApi from "../../Hooks/useApi";
import AuthContext from "../../Context/AuthContext";
function Compose() {
  const { PostData } = useApi();
  const { User } = useContext(AuthContext);
  const [Title, UpdateTitle] = useState("");
  const [Description, updateDesc] = useState("");
  const [Article, UpdateArticle] = useState("");
  const [File, updateFile] = useState(null);
  const [c1, setc1] = useState("");
  const [c2, setc2] = useState("");
  const [c3, setc3] = useState("");

  const HandelTitle = (event) => {
    UpdateTitle(event.target.value);
  };
  const HandelDesc = (event) => {
    updateDesc(event.target.value);
  };
  const HandelArticle = (event) => {
    UpdateArticle(event.target.value);
  };
  const HandelFile = (event) => {
    console.log(event.target.files[0]);
    updateFile(event.target.files[0]);
  };
  const ChangeCat1 = (event) => {
    setc1(event.target.value);
  };
  const ChangeCat2 = (event) => {
    setc2(event.target.value);
  };
  const ChangeCat3 = (event) => {
    setc3(event.target.value);
  };
  const HandelSubmit = (event) => {
    let FileName;
    if (File !== null) {
      const data = new FormData();
      FileName = Date.now() + File.name;
      data.append("FileName", FileName);
      data.append("file", File);
      PostData("Upload", data);
    }
    event.preventDefault();

    File === null
      ? PostData(`Post/Compose/${User.UserName}/${User._id}`, {
          Title: Title,
          Description: Description,
          Article: Article,
          Category: [c1, c2, c3],
        })
      : PostData(`Post/Compose/${User.UserName}/${User._id}`, {
          Title: Title,
          Description: Description,
          Article: Article,
          Category: [c1, c2, c3],
          PostImage: FileName,
        });
    window.location.replace("/");
  };
  return (
    <Flex className={Classes.Compose}>
      {File && (
        <div className={Classes.image}>
          <img src={URL.createObjectURL(File)} alt="" />
        </div>
      )}
      <form onSubmit={HandelSubmit}>
        <label htmlFor="image" className={Classes.btn__image}>
          {!File ? (
            <span>
              Upload an Image <i className="fas fa-file-upload"></i>
            </span>
          ) : (
            <span>
              Change Image <i className="fas fa-file-upload"></i>
            </span>
          )}
        </label>

        <input
          className={Classes.File__input}
          type="file"
          id="image"
          onChange={HandelFile}
        />
        <input
          type="text"
          name="Title"
          value={Title}
          placeholder="Title....."
          onChange={HandelTitle}
          required
        />
        <input
          type="text"
          name="Description"
          value={Description}
          placeholder="Description....."
          onChange={HandelDesc}
          required
        />
        <div>
          <input
            type="text"
            placeholder="Category 1...."
            value={c1}
            onChange={ChangeCat1}
            required
          />
          <input
            type="text"
            placeholder="Category 2...."
            value={c2}
            onChange={ChangeCat2}
            required
          />
          <input
            type="text"
            placeholder="Category 3...."
            value={c3}
            onChange={ChangeCat3}
            required
          />
        </div>
        <textarea
          name="Article"
          id="Article"
          value={Article}
          placeholder="Article....."
          onChange={HandelArticle}
          required
        ></textarea>
        <Button
          variant="contained"
          color="secondary"
          className="btn"
          type="submit"
        >
          Compose
        </Button>
      </form>
    </Flex>
  );
}

export default Compose;
