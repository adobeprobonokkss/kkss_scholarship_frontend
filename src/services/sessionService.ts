import axios from "axios";
import { destroySession } from "./../utils/shared";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

export const handleLogout = async (cb: any) => {
  destroySession();
  const response: any = await axios
    .post(
      `${BACKENDURL}/api/v1/protected/logout`,
      {},
      { withCredentials: true }
    )
    .catch((err) => {
      console.log("getting error from server", err);
    });
  if (response.status == 200) {
    localStorage.removeItem("state");
    cb();
  }
};
