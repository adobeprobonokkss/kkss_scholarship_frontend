import { Outlet } from "react-router-dom";
import React from "react";
import Navigation from "../components/Navigation";

import classes from "../styles/RootLayout.module.css";

function RootLayout() {
  return (
    <>
      <Navigation></Navigation>
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
