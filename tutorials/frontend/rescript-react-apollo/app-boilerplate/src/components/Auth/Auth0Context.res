module Auth0Context = {
  type auth0ContextValues = {
    isAuthenticated: bool,
    loading: bool,
    popupOpen: bool,
    user: unit,
    loginWithRedirect: unit => unit,
    logout: unit => unit,
    // loginWithPopup: unit => unit,
    // handleRedirectCallback: unit => unit,
  }
  let defaultContextValue = {
    isAuthenticated: false,
    loading: true,
    popupOpen: false,
    user: (),
    loginWithRedirect: () => (),
    logout: () => (),
    // loginWithPopup: () => (),
    // handleRedirectCallback: () => (),
  }
  let context = React.createContext(defaultContextValue)

  module Provider = {
    let provider = React.Context.provider(context)

    @react.component
    let make = (~value, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

let useAuth0 = () => React.useContext(Auth0Context.context)
