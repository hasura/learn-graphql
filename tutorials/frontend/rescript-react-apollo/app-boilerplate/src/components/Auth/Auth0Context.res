module Auth0Context = {
  type auth0ContextValues = {
    loading: bool,
    loginWithRedirect: unit => unit,
    logout: unit => unit,
  }
  let defaultContextValue = {
    loading: false,
    loginWithRedirect: () => (),
    logout: () => (),
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
