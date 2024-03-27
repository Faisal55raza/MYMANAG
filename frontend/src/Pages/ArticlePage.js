import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Article from "../Components/Article/Article";
import Loader from "../Components/Loader/Loader";
import useApi from "../Hooks/useApi";

function ArticlePage() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data, fetchData, Loading } = useApi();
  useEffect(() => {
    fetchData(`Post/${path}`);
  }, [path]);
  return (
    <React.Fragment>
      {Loading && <Loader />}
      {!Loading && data.length !== 0 && <Article data={data} />}
    </React.Fragment>
  );
}

export default ArticlePage;
