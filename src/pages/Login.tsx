import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isLogin) navigate("scholarship-form");
    console.log("Value Updated...", isLogin);
  }, [isLogin]);

  const fetchUser = async () => {
    const response: any = await axios.get("http://localhost:1337/api/v1/auth/user", { withCredentials: true }).catch(err => {
      console.log("not authnticated user....");
    });
    if (response && response.data) {
      console.log(response.data);
      return response.data;
    }
  };
  const loginWithGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const response = await axios.get("http://localhost:1337/api/v1/login/google");
    const newWindow = window.open(response.data, "_blank", "width=500,height=600");

    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          console.log("you are authnticated...");
          const userSessionInfo: any = await fetchUser();
          console.log(userSessionInfo);
          if (userSessionInfo.valid) setLogin(true);
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>Login</h1>
        <button onClick={loginWithGoogleSSO}>Login with Gmail</button>
      </div>
    </div>
  );
}

export default Login;
