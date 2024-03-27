import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import Edit from "../Components/PostEdit/Edit";
import useApi from "../Hooks/useApi";
function ArticleEdit() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data, fetchData, Loading } = useApi();
  useEffect(() => {
    fetchData(`Post/${path}`);
  }, [path]);

  return (
    <React.Fragment>
      {Loading && <Loader />}
      {data.length !== 0 && <Edit data={data[0]} />}
    </React.Fragment>
  );
}

export default ArticleEdit;
