const {
  BrowserRouter: Router,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
} = await import("react-router-dom");
const React = await import("react");
const { lazy, useEffect, useState } = await import("react");
import axios from "axios";

const ScholarshipForm = lazy(() => import("./pages/ScholarshipForm"));
const UserDashBoard = lazy(() => import("./pages/UserDashBoard"));
const RootLayout = lazy(() => import("./pages/RootLayout"));
const Protected = lazy(() => import("./pages/Protected"));
const FormSearch = lazy(() => import("./pages/FormSearch"));
const Home = lazy(() => import("./pages/Home"));
const Users = lazy(() => import("./pages/User"));
const PastApplications = lazy(() => import("./pages/PastApplications"));
const TrackVolunteeringHours = lazy(
  () => import("./pages/TrackVolunteeringHours")
);
const ReviewVolunteerHours = lazy(() => import("./pages/ReviewVolunteerHours"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const { destroySession, setUserInfo } = await import("./utils/shared");
const { RoleType } = await import("./utils/types");
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
