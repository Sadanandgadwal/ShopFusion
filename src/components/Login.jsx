import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { notify } from "../utils/notification";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async (e) => {
    e.preventdefault();
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
    notify.sucess("Login Successfully");
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
