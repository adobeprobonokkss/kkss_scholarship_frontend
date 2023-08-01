import React from "react";
import getGoogleOAuthUrl from "../utils/getGoogleUrl";

function Login() {
  return (
    <div className="container">
      <div className="login-card">
        <h1>Login</h1>
        <a href={getGoogleOAuthUrl()}>Login with Gmail</a>
      </div>
    </div>
  );
}

export default Login;
