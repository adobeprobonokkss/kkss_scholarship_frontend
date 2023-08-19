import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./../styles/Login.module.css";
const { v4: uuidv4 } = require("uuid");

function generateRandomString(length: number) {
  return uuidv4().replace(/-/g, "").substring(0, length);
}

const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function Login(props: any) {
  const { setLogin, setUserDetails } = props;
  const [oauthState, setOAuthState] = useState("");
  const navigate = useNavigate();

  // const isStateAvailableLocally = localStorage.getItem("state");

  // if (isStateAvailableLocally) {
  //   const stateSend = isStateAvailableLocally;
  //   console.log("state from cookies", stateSend);
  //   const url = new URL(document.URL);
  //   const queryParams = url.searchParams;
  //   const tokenReceived = queryParams.get("token");
  //   console.log("state from URL", tokenReceived);
  //   if (stateSend === tokenReceived) {
  //     console.log("redirected from web");
  //     navigate("/login/success");
  //     // setLogin(true);
  //     // // just to make sure user has been authnticated by oauth.
  //     // useEffect(() => {
  //     //   (async () => {
  //     //     const usersDetails = await fetchUser();
  //     //     setUserDetails(usersDetails);
  //     //     console.log(usersDetails, "from use Effect");
  //     //   })();
  //     // }, []);
  //   } else {
  //     // console.log("login is void");
  //     // setLogin(false);
  //   }
  // }

  const fetchUser = async () => {
    const response: any = await axios.get(`${BACKENDURL}/api/v1/auth/user`, { withCredentials: true }).catch(err => {
      console.log("not authnticated user....");
    });

    if (response && response.data) {
      console.log(response.data);
      return response.data;
    }
  };

  //NO longer requierd
  const createSession = async () => {
    const isAccessTokenAvailable = localStorage.getItem("accessToken");
    console.log("getting token", isAccessTokenAvailable);
    if (isAccessTokenAvailable) {
      const response: any = await axios.get(`${BACKENDURL}/api/v1/create/session?token=${isAccessTokenAvailable}`, { withCredentials: true }).catch(err => {
        console.log("Getting Error when creating session", err);
      });
      return;
    } else {
      console.log("No access Token found ....");
    }
  };

  const loginWithGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const _OAuthState = generateRandomString(16);
    setOAuthState(_OAuthState);
    localStorage.setItem("state", _OAuthState);
    const response = await axios.get(`${BACKENDURL}/api/v1/login/google?state=${_OAuthState}`);
    // const newWindow = window.location(response.data, "_blank", "width=500,height=600");
    window.location.href = response.data;
    // setIsRedirected(true);
    // if (newWindow) {
    //   timer = setInterval(async () => {
    //     if (newWindow.closed) {
    //       const isLoggedIn = localStorage.getItem("url");
    //       if (isLoggedIn) {
    //         console.log("User is looged in...");
    //         setLogin(true);
    //         localStorage.removeItem("url");
    //       } else {
    //         console.log("User is not logged in...");
    //       }
    //       const userSessionInfo: any = await fetchUser();
    //       // console.log(userSessionInfo);
    //       // if (userSessionInfo.valid) setLogin(true);
    //       if (timer) clearInterval(timer);
    //     }
    //   }, 500);
    // }
  };

  // const submitapplication = async () => {
  //   let timer: NodeJS.Timeout | null = null;
  //   const userSessionInfo: any = await fetchUser();
  //   console.log(userSessionInfo);
  // };

  return (
    <div className={classes.container}>
      <div className={classes["login-card"]}>
        {/* <img src="log.png" alt="Organization Logo" className="org-logo" /> */}
        <h1>SCHOLASHIP</h1>
        <button onClick={loginWithGoogleSSO}>Login with Google</button>
      </div>
    </div>
  );
}

export default Login;
