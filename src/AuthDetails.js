import React, { useEffect, useState, useContext } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setUserLoginStatus } from "./features/authSlice";
import { setSearchQuery, clearSearchQuery } from "./features/searchQuerySlice";
import { setImagesData } from "./features/imagesDataSlice";

function AuthDetails() {
  const authUser = useSelector((state) => state.auth.authUser);
  const userLoginStatus = useSelector((state) => state.auth.userLoginStatus);
  const imagesData = useSelector((state) => state.imagesData);
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserLoginStatus(false));
        dispatch(setAuthUser(null));

        // Display toast notification
        notification.success({
          message: "Sign Out Successful",
          duration: 3, // Duration in seconds
        });
        dispatch(clearSearchQuery())
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button type="primary" onClick={userSignOut} icon={<LogoutOutlined />}>
        Sign Out
      </Button>
    </>
  );
}

export default AuthDetails;
