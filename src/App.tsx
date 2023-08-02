import { BrowserRouter as Router, Link, createBrowserRouter, Route, Routes, RouterProvider } from "react-router-dom";
import React from "react";

import ScholarshipForm from "./pages/ScholarshipForm";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import LoginSuccess from "./pages/LoginSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/scholarship-form", element: <Protected Component={ScholarshipForm} /> }]
  }
]);

function App() {
  const isLogin = false;
  return isLogin ? (
    <RouterProvider router={router} />
  ) : (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login/success">loging_success</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login/success" element={<LoginSuccess />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
