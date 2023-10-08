import React, { lazy, useEffect } from "react";
const Login = lazy(() => import("./Login"));
const LoginSuccess = lazy(() => import("./LoginSuccess"));
import { getUsersInfo, setUserInfo } from "./../utils/shared";
import axios from "axios";

const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function Home(props: any) {
  const { setLogin } = props;
  const isStateAvailableLocally = localStorage.getItem("state");
  let isLoggedIn = false;

  const fetchUser = async () => {
    const response: any = await axios
      .get(`${BACKENDURL}/api/v1/auth/user`, { withCredentials: true })
      .catch((err) => {
        console.log("USER IS NOT AUTHNTICATED,PLEASE LOGING AGAIN");
        isLoggedIn = false;
        setLogin(false);
      });

    if (response && response.data) {
      console.log(response.data);
      return response.data;
    }
  };

  if (getUsersInfo().valid) {
    isLoggedIn = true;
    setLogin(true);
  } else if (isStateAvailableLocally) {
    isLoggedIn = true;
    const stateSend = isStateAvailableLocally;
    console.log("state from cookies", stateSend);
    const url = new URL(document.URL);
    const queryParams = url.searchParams;
    const tokenReceived = queryParams.get("token");
    console.log("state from URL", tokenReceived);

    if (stateSend === tokenReceived) {
      console.log("redirected from oAuth Successfully done");
      useEffect(() => {
        (async () => {
          const userDetails = await fetchUser();
          console.log("[LoginSuccess]", userDetails);
          if (!userDetails) {
            setLogin(false);
            isLoggedIn = false;
            return;
          }
          setUserInfo(userDetails);
          setLogin(true);
          isLoggedIn = true;
        })();
      }, []);
    } else {
      setLogin(false);
      isLoggedIn = false;
    }
  } else {
    isLoggedIn = false;
    setLogin(false);
  }
  return isLoggedIn ? (
    <LoginSuccess setLogin={setLogin}></LoginSuccess>
  ) : (
    <Login></Login>
  );
}

export default Home;
