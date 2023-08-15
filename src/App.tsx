import { BrowserRouter as Router, Navigate, Link, createBrowserRouter, Route, Routes, RouterProvider, redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import LoginSuccess from "./pages/LoginSuccess";
import ListUsers from "./pages/ListUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/scholarship-form",
        element: <Protected Component={ScholarshipForm} />
      },
      {
        path: "/",
        element: <Protected Component={UserDashBoard} />
      }
    ]
  }
]);

function App() {
  const [isLogin, setLogin] = useState(false);
  const [usersDetail, setUserDetails] = useState(null);

  useEffect(() => {
    console.log("from appliction", usersDetail);
  }, [isLogin]);

  return isLogin ? (
    <RouterProvider router={router} />
  ) : (
    <Router>
      <Routes>
        {!isLogin ? <Route path="*" element={<Login setUserDetails={setUserDetails} setLogin={setLogin} />}></Route> : ""}
        <Route path="/login/success" element={<LoginSuccess />}></Route>
        {/* <Route path="/scholarship-form" element={<ScholarshipForm />}></Route> */}
        <Route path="/users" element={<ListUsers />}></Route>
        <Route path="/dashboard" element={<UserDashBoard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
