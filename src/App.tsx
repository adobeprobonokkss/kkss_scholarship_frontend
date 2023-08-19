import { BrowserRouter as Router, Navigate, Link, createBrowserRouter, Route, Routes, RouterProvider, redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import UserDashBoard from "./pages/UserDashBoard";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import DataContext from "./DataContext";
import Protected from "./pages/Protected";
import LoginSuccess from "./pages/LoginSuccess";
import ListUsers from "./pages/ListUsers";
import { defaultUserSession } from "./interface/UserSession";
import Header from "./components/header";
import Home from "./pages/Home";

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
      },

      {
        path: "/list",
        element: <Protected Component={ListUsers} />
      }
    ]
  }
]);

function App() {
  const [isLogin, setLogin] = useState(false);
  const [usersDetail, setUserDetails] = useState(defaultUserSession);

  useEffect(() => {
    console.log("From  Application", usersDetail);
  }, [isLogin]);

  return isLogin ? (
    <DataContext.Provider value={usersDetail}>
      <Header setLogin={setLogin}></Header>
      <RouterProvider router={router} />
    </DataContext.Provider>
  ) : (
    <Router>
      <Routes>{<Route path="*" element={<Home setLogin={setLogin} />}></Route>}</Routes>
    </Router>
  );
}

export default App;
