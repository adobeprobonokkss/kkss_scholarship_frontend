import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function Login(props: any) {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isLogin) navigate("scholarship-form");
    console.log("Value Updated...", isLogin);
  }, [isLogin]);

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
          console.log("you are authnticated...");
          // await createSession();
          const userSessionInfo: any = await fetchUser();
          console.log(userSessionInfo);
          if (userSessionInfo.valid) props.setLogin(true);
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  const submitapplication = async () => {
    let timer: NodeJS.Timeout | null = null;
    const userSessionInfo: any = await fetchUser();
    console.log(userSessionInfo);
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>Login</h1>
        <button onClick={loginWithGoogleSSO}>Login with Gmail</button>
        <button onClick={submitapplication}>submit application</button>
      </div>
    </div>
  );
}

export default Login;
