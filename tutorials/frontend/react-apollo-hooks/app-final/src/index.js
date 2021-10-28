import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import Auth0ProviderWithHistory from "./components/Auth/auth0-provider-with-history";

import App from "./components/App";
import "./styles/App.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
