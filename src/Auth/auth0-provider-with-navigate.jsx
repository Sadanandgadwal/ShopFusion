import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/zustore";
export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  const UserAction = userStore((store) => store.UserAction);
  const domain = "process.env.Domain";
  const clientId = "process.env.Clientid";
  const redirectUri = "http://192.168.1.9:5173";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
