import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import cookieParser from "cookie-parser";

function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = true;
    console.log("protected");
    if (!login) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
