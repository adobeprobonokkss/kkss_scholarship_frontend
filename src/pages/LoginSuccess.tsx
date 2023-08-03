import React, { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
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
