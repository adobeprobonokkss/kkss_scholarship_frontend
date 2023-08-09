import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import cookieParser from "cookie-parser";

function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = true;
    if (!login) {
      navigate("login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
