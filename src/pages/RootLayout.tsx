import { Outlet } from "react-router-dom";
import React from "react";
import classes from "../styles/RootLayout.module.css";
import Header from "../components/header";
function RootLayout(props: any) {
  const { setLogin } = props;
  return (
    <>
      <main className={classes.content}>
        <Header setLogin={setLogin}></Header>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
