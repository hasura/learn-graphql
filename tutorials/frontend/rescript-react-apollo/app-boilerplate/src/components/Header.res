open ReactBootstrap

@react.component
let make = (~logoutHandler) =>
  <Navbar className="justify-content-between">
    <Navbar.Brand> {"GraphQL Tutorial App"->React.string} </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <LogoutBtn logoutHandler={logoutHandler} />
    </Navbar.Collapse>
  </Navbar>

let default = make
