import React, { useEffect } from "react";
import Classes from "./SideBar.module.css";
import Blog from "../../Assets/Blog.png";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";

function SideBar() {
  const { data, fetchData, Loading } = useApi();
  useEffect(() => {
    fetchData("Cat");
  }, []);
  return (
    <div className={Classes.SideBar}>
      <img src={Blog} alt="BlogPic" />
      {Loading && <Loader />}
      {!Loading && (
        <div className={Classes.Box}>
          <h2>
            <i className="fas fa-bars"></i> &nbsp;Categories
          </h2>
          <div>
            <i className="fas fa-hand-point-right"></i> &nbsp;All
          </div>
          {data.map((Cat) => {
            return (
              <div>
                <i className="fas fa-hand-point-right"></i> &nbsp;{Cat.Name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SideBar;
