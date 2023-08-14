import React, { useEffect } from "react";

function LoginSuccess() {
  function setLocalStorage(urlString: string) {
    const parsedUrl = new URL(urlString);
    const fragment = parsedUrl.hash.substring(1);
    const queryParams = new URLSearchParams(fragment);
    const accessToken = queryParams.get("token");
    // return accessToken;
    if (accessToken) {
      console.log("Access Token:", accessToken);
      localStorage.setItem("accessToken", accessToken);
    } else {
      //localStorage.setItem("accessToken", "not present");
      console.log("Access Token not found in the URL.");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLocalStorage(document.URL);
      window.close();
    }, 3000);
  }, []);

  return (
    <div className="container">
      <div className="login-card">
        <h1>Login</h1>
        <button>Logged In successfully with Gmail</button>
      </div>
    </div>
  );
}

export default LoginSuccess;
