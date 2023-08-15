import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./../styles/Login.module.css";
// import orgimage from "log.png";

const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function Login(props: any) {
  const { setLogin } = props;
  useEffect(() => {
    console.log("Value Updated...");
  }, []);

  const fetchUser = async () => {
    const response: any = await axios.get(`${BACKENDURL}/api/v1/auth/user`, { withCredentials: true }).catch(err => {
      console.log("not authnticated user....");
    });
    console.log("hello", response);
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
    const response = await axios.get(`${BACKENDURL}/api/v1/login/google`);
    const newWindow = window.open(response.data, "_blank", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          const isLoggedIn = localStorage.getItem("url");
          if (isLoggedIn) {
            console.log("User is looged in...");
            setLogin(true);
            localStorage.removeItem("url");
          } else {
            console.log("User is not logged in...");
          }
          const userSessionInfo: any = await fetchUser();
          // console.log(userSessionInfo);
          // if (userSessionInfo.valid) setLogin(true);
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
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
        <h1>PORTALORG</h1>
        <button onClick={loginWithGoogleSSO}>Login with Google</button>
      </div>
    </div>
  );
}

export default Login;
