import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Protected from "./pages/Protected";
import FormSearch from "./pages/FormSearch";
import Home from "./pages/Home";
import Users from "./pages/User";
import axios, { AxiosError } from "axios";
import { destroySession, setUserInfo } from "./utils/shared";
import { RoleType } from "./utils/types";
import EditProfile from "./pages/EditProfile";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;
import PastApplications from "./pages/PastApplications";
function App() {
  useEffect(() => {
    (async () => {
      console.log("some function here......");

      const response: any = await axios
        .get(`${BACKENDURL}/api/v1/auth/user`, { withCredentials: true })
        .catch((err) => {
          console.log("getting error from server", err);
        });
      if (response && response.status == 200) {
        setUserInfo(response.data);
        localStorage.removeItem("state");
        setLogin(true);
      } else {
        setLogin(false);
      }
    })();
  }, []);

  const [isLogin, setLogin] = useState(false);

  const handleLogout = async () => {
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
      setLogin(false);
    }
  };

  axios.interceptors.response.use(
    function (response) {
      console.log("interceptor", response.request.responseURL, response.status);
      if (response.status === 401) {
        handleLogout();
        return response;
      }
      return response;
    },
    function (error) {
      console.log(error);
      handleLogout();
      return Promise.reject(error);
    }
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout setLogin={setLogin} />,
      children: [
        {
          path: "/",
          element: <Protected accessList={["*"]} Component={UserDashBoard} />,
        },
        {
          path: "/scholarship-form",
          element: (
            <Protected
              accessList={[RoleType.USER]}
              Component={ScholarshipForm}
            />
          ),
        },
        {
          path: "/scholarship-form/:mode/:scholarshipID",
          element: <Protected accessList={["*"]} Component={ScholarshipForm} />,
        },
        {
          path: "/search/:year?/:status?",
          element: (
            <Protected
              accessList={[RoleType.ADMIN, RoleType.PROGRAM_MANAGER]}
              Component={FormSearch}
            />
          ),
        },
        {
          path: "/past-applications",
          element: (
            <Protected
              accessList={[RoleType.USER]}
              Component={PastApplications}
            />
          ),
        },
        {
          path: "/list",
          element: (
            <Protected accessList={[RoleType.ADMIN]} Component={Users} />
          ),
        },
        {
          path: "/edit_profile",
          element: <Protected accessList={["*"]} Component={EditProfile} />,
        },
        {
          path: "/*",
          element: <Protected accessList={["*"]} Component={UserDashBoard} />,
        },
      ],
    },
  ]);

  return isLogin ? (
    <>
      <RouterProvider router={router} />
    </>
  ) : (
    <Router>
      <Routes>
        {<Route path="*" element={<Home setLogin={setLogin} />}></Route>}
      </Routes>
    </Router>
  );
}

export default App;
