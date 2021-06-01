import ReactDOM from "react-dom";
import React from "react";
import { Route, Router } from "react-router-dom";

import "./styles/App.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

import { Auth0Provider } from "./components/Auth/react-auth0-spa";
import { authConfig } from "./components/Auth/Auth0Variables.bs";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const mainRoutes = (
  <Router history={history}>
    <Route
      path="/"
      render={(props) => (
        <Auth0Provider
          domain={authConfig.domain}
          client_id={authConfig.clientId}
          redirect_uri={authConfig.callbackUrl}
          onRedirectCallback={onRedirectCallback}
        />
      )}
    />
  </Router>
);

ReactDOM.render(mainRoutes, document.getElementById("root"));
