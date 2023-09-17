import React from "react";
import { Navigate } from "react-router-dom";
import { getUsersInfo } from "./../utils/shared";

/**
 * @description to protect route from client side- if user directly enters the url which he has
 * not access, will be route to dashboard
 * * - is for all users
 *
 * @param props
 * @returns
 */
function Protected(props: any) {
  const { Component } = props;
  const accessList = props.accessList;
  const currnentUserRole = getUsersInfo().decoded?.role;

  {
    return accessList.includes(currnentUserRole) || accessList.includes("*") ? (
      <div>
        <Component />
      </div>
    ) : (
      <Navigate to={"/"}></Navigate>
    );
  }
}

export default Protected;
