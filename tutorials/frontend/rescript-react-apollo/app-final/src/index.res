%raw("require('./styles/App.css')")
open ReactRouterDom

@val @scope(("window", "location"))
external pathname: string = "pathname"

@scope("document") @val
external getElementById: string => Dom.element = "getElementById"

type history = {push: string => unit}
@module("history") external createBrowserHistory: unit => history = "createBrowserHistory"

type appState = {targetUrl: option<string>}

let history = createBrowserHistory()

let authConfig = Auth0Variables.authConfig

module Auth0Provider = {
  @module("./components/Auth/react-auth0-spa") @react.component
  external make: (~domain: string, ~client_id: string, ~redirect_uri: string) => React.element =
    "Auth0Provider"
}

let mainRoutes =
  <Router history={history}>
    <Route
      path="/"
      render={props =>
        <Auth0Provider
          domain={authConfig.domain}
          client_id={authConfig.clientId}
          redirect_uri={authConfig.callbackUrl}
        />}
    />
  </Router>

ReactDOM.render(mainRoutes, getElementById("root"))
