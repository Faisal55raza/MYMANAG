import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
function useApi(props) {
  const { Register, LogIn, AuthError, UpdateUser } = useContext(AuthContext);
  const Base__Url = "http://localhost";
  const [data, updateData] = useState([]);
  const [Loading, updateLoading] = useState(false);
  const fetchData = async (Url) => {
    updateLoading(true);
    const request = await axios.get(`${Base__Url}/${Url}`);
    await updateData(request.data);
    await updateLoading(false);
  };
  const PostData = async (Url, Info) => {
    updateLoading(true);
    const request = await axios
      .post(`${Base__Url}/${Url}`, Info)
      .then(() => {
        updateData(request.data);
        AuthError("SuccessFully Composed");
      })
      .catch((error) => {
        AuthError("Something Went Wrong");
      });
    await updateLoading(false);
  };
  const DeleteData = async (Url) => {
    await axios.delete(`${Base__Url}/${Url}`);
    window.location.replace("/");
  };

  const SignUp = async (User) => {
    updateLoading(true);
    const request = await axios
      .post(`${Base__Url}/Auth/Register`, User)
      .catch((error) => {
        AuthError(error.message);
      });
    await updateData(request.data);
    await Register(request.data);
    await AuthError("SuccessFully Register");
    await await updateLoading(false);
    await window.location.reload();
  };
  const SignIn = async (User) => {
    updateLoading(true);
    await axios
      .post(`${Base__Url}/Auth/SignIn`, User)
      .then((data) => {
        if (
          data.data === "Wrong Password" ||
          data.data === "Wrong Credentials"
        ) {
          AuthError("Wrong Credentials");
        } else {
          LogIn(data.data);
          AuthError("SuccessFully Login");
        }
      })
      .then(() => {
        updateLoading(false);
        updateLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        AuthError("Wrong Credentials");
      });
  };
  const Profile = async (id, data) => {
    updateLoading(true);
    const request = await axios.put(`${Base__Url}/Update/${id}`, data);
    await updateData(request.data);
    await UpdateUser(request.data);
    AuthError("SuccessFully Updated");
    await updateLoading(false);
  };
  const Update = async (URL, data) => {
    updateLoading(true);
    await axios
      .put(`${Base__Url}/${URL}`, data)
      .then((request) => {
        updateData(request.data);
        AuthError("SuccessFully Updated");
      })
      .catch((error) => AuthError("Something Went Wrong"));
    await updateLoading(false);
  };
  const Delete = async (URL) => {
    updateLoading(true);
    await axios
      .delete(`${Base__Url}/${URL}`)
      .then((request) => {
        console.log(request.data);
        updateData(request.data);
        AuthError("Account Deleted");
      })
      .catch((error) => AuthError("Something Went Wrong"));
    await updateLoading(false);
  };
  return {
    data,
    fetchData,
    PostData,
    SignUp,
    SignIn,
    Profile,
    DeleteData,
    Update,
    Delete,
    Loading,
  };
}

export default useApi;
