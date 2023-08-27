import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getUsersInfo } from "./../utils/shared";

function Protected(props: any) {
  console.log("passing", props.access);
  const { Component } = props;
  const access = props.access;
  const role = getUsersInfo().decoded?.role;
  const navigate = useNavigate();

  if (false) {
    console.log("Navigating to ...");
    navigate("/");
  }

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
