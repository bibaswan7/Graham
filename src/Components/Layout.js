import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function Layout() {
  const userLoginStatus = useSelector((state) => state.auth.userLoginStatus);

  return (
    userLoginStatus ? (
      <>
        <Navbar />
        <Outlet />
      </>
    ) : (
      <Outlet />
    )
  );
}
