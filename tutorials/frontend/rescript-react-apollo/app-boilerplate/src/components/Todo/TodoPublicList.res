type todoPublicListStateType = {
  olderTodosAvailable: bool,
  newTodosCount: int,
  todos: array<TaskItem.todo>,
}

let initialState = {
  olderTodosAvailable: true,
  newTodosCount: 1,
  todos: [
    {
      id: "1",
      title: "This is public todo 1",
      is_completed: false,
      is_public: true,
      user: {
        name: "someUser1",
      },
    },
    {
      id: "2",
      title: "This is public todo 2",
      is_completed: false,
      is_public: true,
      user: {
        name: "someUser2",
      },
    },
    {
      id: "3",
      title: "This is public todo 3",
      is_completed: false,
      is_public: true,
      user: {
        name: "someUser3",
      },
    },
    {
      id: "4",
      title: "This is public todo 4",
      is_completed: false,
      is_public: true,
      user: {
        name: "someUser4",
      },
    },
  ],
}

@react.component
let make = () => {
  let state = initialState
  let loadNew = e => ()

  let loadOlder = e => ()

  let todos = state.todos

  let todoList =
    <ul>
      {React.array(
        Js.Array2.mapi(todos, (todo, index) =>
          <TaskItem key={Js.Int.toString(index)} todo={todo} />
        ),
      )}
    </ul>

  let newTodosNotification = if state.newTodosCount > 0 {
    <div className={"loadMoreSection"} onClick={loadNew}>
      {React.string(`New tasks have arrived! (${Js.Int.toString(state.newTodosCount)})`)}
    </div>
  } else {
    React.string("")
  }

  let olderTodosMsg =
    <div className={"loadMoreSection"} onClick={loadOlder}>
      {(state.olderTodosAvailable ? "Load older tasks" : "No more public tasks!")->React.string}
    </div>

  <React.Fragment>
    <div className="todoListWrapper"> {newTodosNotification} {todoList} {olderTodosMsg} </div>
  </React.Fragment>
}

let default = make
