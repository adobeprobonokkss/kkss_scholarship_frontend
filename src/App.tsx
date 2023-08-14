import { BrowserRouter as Router, Navigate, Link, createBrowserRouter, Route, Routes, RouterProvider, redirect } from "react-router-dom";
import React, { useState } from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import LoginSuccess from "./pages/LoginSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/scholarship-form",
        element: <Protected Component={ScholarshipForm} />
      }
    ]
  }
]);

function App() {
  const [isLogin, setLogin] = useState(false);

  return isLogin ? (
    <RouterProvider router={router} />
  ) : (
    <Router>
      <Routes>
        {!isLogin ? <Route path="*" element={<Login setLogin={setLogin} />}></Route> : ""}
        <Route path="/login/success" element={<LoginSuccess />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
