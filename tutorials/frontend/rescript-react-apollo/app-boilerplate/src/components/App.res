@react.component
let make = () => {
  let {loading, logout} = Auth0Context.useAuth0()
  if loading {
    <div> {React.string("Loading...")} </div>
  } else {
    <div>
      <Header logoutHandler={logout} />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-6 sliderMenu p-30"> <TodoPrivateWrapper /> </div>
          <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
            <TodoPublicWrapper />
          </div>
        </div>
        <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray"> <OnlineUsersWrapper /> </div>
        </div>
      </div>
    </div>
  }
}

let default = make
