import React, { useState } from "react";
import axios from "axios";
import classes from "./../styles/Login.module.css";
import { Button } from "@swc-react/button";
import { Icon } from "@swc-react/icon";
import LoginIcon from "../components/LoginIcon";
const { v4: uuidv4 } = require("uuid");

function generateRandomString(length: number) {
  return uuidv4().replace(/-/g, "").substring(0, length);
}

const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function Login(props: any) {
  const [oauthState, setOAuthState] = useState("");

  const loginWithGoogleSSO = async () => {
    const _OAuthState = generateRandomString(16);
    setOAuthState(_OAuthState);
    localStorage.setItem("state", _OAuthState);
    const response = await axios.get(
      `${BACKENDURL}/api/v1/login/google?state=${_OAuthState}`
    );
    window.location.href = response.data;
  };

  return (
    <div className={classes.container}>
      <div className={classes["login-card"]}>
        <img
          className={classes["logo"]}
          src="assets/AbhyudayaLogo.jpeg"
          alt=""
        />
        <h1>Keshava Kripa Samvardhana Samiti</h1>
        <h2>Abhyudaya Vidyanidhi</h2>
        <h2>Scholarship Portal</h2>
        <Button
          className={classes["login-button"]}
          onClick={loginWithGoogleSSO}
        >
          <Icon slot="icon">
            <LoginIcon />
          </Icon>
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
