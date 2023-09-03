import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { notify } from "../utils/notification";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    notify.sucess("Logout Successfully");
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};
