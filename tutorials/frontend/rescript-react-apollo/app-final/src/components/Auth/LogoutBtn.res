open ReactBootstrap

@react.component
let make = (~logoutHandler) => {
  <Button
    id="qsLogoutBtn" variant="primary" className="btn-margin logoutBtn" onClick={logoutHandler}>
    {"Log Out"->React.string}
  </Button>
}

let default = make
