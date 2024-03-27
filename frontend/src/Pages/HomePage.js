import React, { useEffect } from "react";
import Home from "../Components/Home/Home";
import PostBox from "../Components/Posts/PostBox";
import useApi from "../Hooks/useApi";
import Loader from "../Components/Loader/Loader";
export default function HomePage() {
  const { data, fetchData, Loading } = useApi();
  useEffect(() => {
    fetchData(`Post`);
  }, []);
  return (
    <React.Fragment>
      <Home />
      {Loading && <Loader />}
      {!Loading && <PostBox data={data} />}
    </React.Fragment>
  );
}
