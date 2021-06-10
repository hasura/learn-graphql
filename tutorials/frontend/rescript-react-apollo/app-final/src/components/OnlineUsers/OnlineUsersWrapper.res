module UpdateLastSeenMutation = %graphql(`
    mutation updateLastSeen {
      update_users(where: {}, _set: { last_seen: "now()" }) {
        affected_rows
      }
    }
  `)

@react.component
let make = () => {
  let (updateLastSeenMutation, _) = UpdateLastSeenMutation.use()
  let onlineUsersResult = OnlineUser.OnlineUsersSubscription.use()

  let updateLastSeen = () => {
    // Use the apollo client to run a mutation to update the last_seen value
    updateLastSeenMutation()->ignore
  }

  React.useEffect1(() => {
    // Every 30s, run a mutation to tell the backend that you're online
    updateLastSeen()
    let timerId = Js.Global.setInterval(updateLastSeen, 20000)
    Some(() => Js.Global.clearInterval(timerId))
  }, [])

  switch onlineUsersResult {
  | {loading: true} => <span> {React.string("Loading...")} </span>
  | {data: Some({online_users}), error: None} => {
      let onlineUsersList = Js.Array2.mapi(online_users, (u, i) =>
        <OnlineUser key={Js.Int.toString(i)} user={u.user} />
      )
      <div className="onlineUsersWrapper">
        <div className="sliderHeader">
          {React.string(`Online users - ${Js.Int.toString(Js.Array2.length(onlineUsersList))}`)}
        </div>
        {React.array(onlineUsersList)}
      </div>
    }
  | {error} => {
      Js.log(error)
      <span> {React.string("Error!")} </span>
    }
  }
}

let default = make
