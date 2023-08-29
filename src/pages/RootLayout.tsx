import { Outlet } from "react-router-dom";
import React from "react";
import classes from "../styles/RootLayout.module.css";
import Header from "../components/header";
function RootLayout(props: any) {
  const { setLogin } = props;
  return (
    <>
      {/* <Navigation></Navigation> */}
      <Header setLogin={setLogin}></Header>
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
