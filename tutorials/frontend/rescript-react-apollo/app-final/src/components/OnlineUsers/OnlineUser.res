module OnlineUsersSubscription = %graphql(`
  subscription getOnlineUsers {
    online_users(order_by: [{ user: { name: asc } }]) {
      id
      user {
        name
      }
    }
  }
`)

@react.component
let make = (
  ~user: option<OnlineUsersSubscription.OnlineUsersSubscription_inner.t_online_users_user>,
) => {
  switch user {
  | Some(user) =>
    <div className="userInfo">
      <div className="userImg"> <i className="far fa-user" /> </div>
      <div className="userName"> {React.string(user.name)} </div>
    </div>
  | None => React.null
  }
}

let default = make
