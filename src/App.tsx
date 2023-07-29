import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ScholarshipForm from "./pages/ScholarshipForm";
import RootLayout from "./pages/RootLayout";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/scholarship-form", element: <ScholarshipForm /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
