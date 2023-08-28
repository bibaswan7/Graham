import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { setAuthUser } from "./features/authSlice";
import { auth } from "./firebase";

export default function AuthVerification() {
  const authUser = useSelector((state) => state.auth.authUser);
  const userLoginStatus = useSelector((state) => state.auth.userLoginStatus);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setAuthUser(user));
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userLoginStatus || !authUser) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
