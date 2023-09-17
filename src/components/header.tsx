import React from "react";
import classes from "././../styles/Header.module.css";
// import axios from "axios";
import { getUsersInfo, destroySession } from "./../utils/shared";
import Navigation from "./Navigation";
import { RoleType } from "./../utils/types";
// const BACKENDURL = process.env.REACT_APP_BACK_END_URL;
import { handleLogout } from "./../services/sessionService";

const Header = (props: any) => {
  const { setLogin } = props;
  const { decoded } = getUsersInfo();
  const role = decoded?.role ?? RoleType.USER;
  const imageUrl = decoded?.picture || "";
  // const handleLogout = async () => {
  //   destroySession();
  //   const response: any = await axios
  //     .post(
  //       `${BACKENDURL}/api/v1/protected/logout`,
  //       {},
  //       { withCredentials: true }
  //     )
  //     .catch((err) => {
  //       console.log("getting error from server", err);
  //     });
  //   if (response.status == 200) {
  //     localStorage.removeItem("state");
  //     setLogin(false);
  //   }
  // };

  return (
    <div className={classes.header}>
      <div className={classes.user_info}>
        <img className={classes.profile_image} src={imageUrl} alt={imageUrl} />
        <span className={classes.username}>{decoded?.name}</span>
      </div>
      <Navigation role={role}></Navigation>
      <button
        onClick={() => {
          handleLogout(() => {});
          setLogin(false);
        }}
        className={classes.logout_button}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
