import React, { useEffect } from "react";

function LoginSuccess(props: any) {
  // const { setUserDetails, setLogin } = props;
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
      localStorage.setItem("url", document.URL);
      window.close();
    }, 3000);
  }, []);

  return (
    <div className="container">
      <div className="login-card">
        <h1>Redirect Page</h1>
        <button>Wait for some time we are Redirecting you....</button>
      </div>
    </div>
  );
}

export default LoginSuccess;
