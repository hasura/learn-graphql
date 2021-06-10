@react.component
let make = () => {
  let onlineUsers: array<OnlineUser.user> = [{name: "someUser1"}, {name: "someUser2"}]
  let onlineUsersList = Js.Array2.mapi(onlineUsers, (user, index) =>
    <OnlineUser key={Js.Int.toString(index)} user={user} />
  )
  <div className="onlineUsersWrapper">
    <div className="sliderHeader">
      {`Online users - ${onlineUsers->Js.Array.length->Js.Int.toString}`->React.string}
    </div>
    {React.array(onlineUsersList)}
  </div>
}

let default = make
