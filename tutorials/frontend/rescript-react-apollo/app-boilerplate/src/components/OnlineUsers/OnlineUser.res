type user = {name: string}

@react.component
let make = (~user) => {
  <div className="userInfo">
    <div className="userImg"> <i className="far fa-user" /> </div>
    <div className="userName"> {React.string(user.name)} </div>
  </div>
}
