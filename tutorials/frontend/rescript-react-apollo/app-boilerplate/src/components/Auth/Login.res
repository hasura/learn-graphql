open ReactBootstrap

@react.component
let make = () => {
  let {loading, loginWithRedirect} = Auth0Context.useAuth0()
  if loading {
    <div> {"Loading..."->React.string} </div>
  } else {
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-heading">
          {"Welcome to the GraphQL tutorial app"->React.string}
        </div>
        <div className="overlay-message"> {"Please login to continue"->React.string} </div>
        <div className="overlay-action">
          <Button
            id="qsLoginBtn"
            variant="primary"
            className="btn-margin loginBtn"
            onClick={() => {
              loginWithRedirect()
            }}>
            {"Log In"->React.string}
          </Button>
        </div>
      </div>
    </div>
  }
}

let default = make
