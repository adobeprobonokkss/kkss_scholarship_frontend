import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import React, { useState } from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Protected from "./pages/Protected";
import FormSearch from "./pages/FormSearch";
import Home from "./pages/Home";
import Users from "./pages/User";
import PastApplications from "./pages/PastApplications";
import { TrackVolunteeringHours } from "./pages/TrackVolunteeringHours";

function App() {
  const [isLogin, setLogin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout setLogin={setLogin} />,
      children: [
        {
          path: "/",
          element: <Protected Component={UserDashBoard} />,
        },
        {
          path: "/scholarship-form",

          element: <Protected Component={ScholarshipForm} />,
        },
        {
          path: "/scholarship-form/:mode/:scholarshipID",
          element: <Protected Component={ScholarshipForm} />,
        },
        {
          path: "/search/:year?/:status?",
          element: <Protected Component={FormSearch} />,
        },
        {
          path: "/past-applications",
          element: <Protected Component={PastApplications} />,
        },
        {
          path: "/list",
          element: <Protected access={"ADMIN"} Component={Users} />,
        },
        {
          path: "/track-time",
          element: <Protected Component={TrackVolunteeringHours} />,
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
