import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { AUTH_CONFIG } from "./auth0-variables";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={AUTH_CONFIG.domain}
      clientId={AUTH_CONFIG.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={AUTH_CONFIG.audience}
      scope={AUTH_CONFIG.scope}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
