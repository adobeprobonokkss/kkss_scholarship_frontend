import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Protected from "./pages/Protected";
// import ListUsers from "./pages/ListUsers";
import FormSearch from "./pages/FormSearch";
import Header from "./components/header";
import Home from "./pages/Home";
import Users from "./pages/User";

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
          path: "/search",
          element: <Protected Component={FormSearch} />,
        },

        {
          path: "/list",
          element: <Protected access={"ADMIN"} Component={Users} />,
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
