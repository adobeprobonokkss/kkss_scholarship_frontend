import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Protected from "./pages/Protected";
import FormSearch from "./pages/FormSearch";
import Home from "./pages/Home";
import Users from "./pages/User";
import PastApplications from "./pages/PastApplications";
import TrackVolunteeringHours from "./pages/TrackVolunteeringHours";
import ReviewVolunteerHours from "./pages/ReviewVolunteerHours";
import EditProfile from "./pages/EditProfile";

import { destroySession, setUserInfo } from "./utils/shared";
import { RoleType } from "./utils/types";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

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
      isLogin && handleLogout();
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
        {
          path: "/track-time",
          element: (
            <Protected
              accessList={[RoleType.USER]}
              Component={TrackVolunteeringHours}
            />
          ),
        },
        {
          path: "review-volunteer-hours",
          element: (
            <Protected
              accessList={[RoleType.PROGRAM_MANAGER, RoleType.ADMIN]}
              Component={ReviewVolunteerHours}
            />
          ),
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
