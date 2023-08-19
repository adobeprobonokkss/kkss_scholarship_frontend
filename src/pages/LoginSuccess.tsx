import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserInfo } from "./../utils/shared";

import { defaultUserSession, userSession } from "./../interface/UserSession";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;
function LoginSuccess(props: any) {
  const { setLogin } = props;
  const navigate = useNavigate();
  // const [details, SetDetails] = useState(defaultUserSession);

  // const fetchUser = async () => {
  //   const response: any = await axios.get(`${BACKENDURL}/api/v1/auth/user`, { withCredentials: true }).catch(err => {
  //     console.log("not authnticated user....");
  //   });

  //   if (response && response.data) {
  //     console.log(response.data);
  //     return response.data;
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     const userDetails = await fetchUser();
  //     console.log("[LoginSuccess]", userDetails);
  //     if (!userDetails) {
  //       setLogin(false);
  //       return;
  //     }
  //     setUserInfo(userDetails);
  //     setLogin(true);
  //   })();
  // }, []);

  return (
    <div className="container">
      <div className="login-card">
        <h1>Loading....</h1>
      </div>
    </div>
  );
}

export default LoginSuccess;
