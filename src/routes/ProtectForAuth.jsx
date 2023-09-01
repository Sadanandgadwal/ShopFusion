import React from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../store/zustore";

const ProtecForAuthen = ({ children }) => {
  const { auth } = authStore(token);

  if (!auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtecForAuthen;
