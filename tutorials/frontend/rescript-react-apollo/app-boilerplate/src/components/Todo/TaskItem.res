type todo = {
  title: string,
  is_completed: bool,
  user: OnlineUser.user,
}

@react.component
let make = (~todo) => {
  <li>
    <div className="userInfoPublic"> {`@${todo.user.name}`->React.string} </div>
    <div className={"labelContent" ++ (todo.is_completed ? " completed" : "")}>
      <div> {todo.title->React.string} </div>
    </div>
  </li>
}

let default = make
