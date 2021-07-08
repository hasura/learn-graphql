@react.component
let make = (~latestTodo: NotifyNewPublicTodosSubscription.Inner.t_todos) => {
  let oldestTodoId = latestTodo.id + 1
  let todosResult = PublicTodosQuery.use({oldestTodoId: oldestTodoId})
  let olderTodosAvailable = true // Todo: need to implement conditional

  switch todosResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos}), error: None, fetchMore} => {
      let loadOlder = _e => {
        let oldTodo = todos[Js.Array2.length(todos) - 1]
        let oldTodoId = oldTodo.id

        fetchMore(~updateQuery=(previousData, {fetchMoreResult}) => {
          switch fetchMoreResult {
          | Some({todos: newTodos}) => {
              todos: Belt.Array.concat(todos, newTodos),
            }
          | None => previousData
          }
        }, ~variables={oldestTodoId: oldTodoId}, ())->ignore
      }
      let todoList = Js.Array2.mapi(todos, (todo, index) =>
        <TaskItem key={Js.Int.toString(index)} todo={todo} />
      )

      <div className="todoListWrapper">
        <ul> {React.array(todoList)} </ul>
        <div className="loadMoreSection" onClick={loadOlder}>
          {olderTodosAvailable
            ? React.string("Load older tasks")
            : React.string("No more public tasks!")}
        </div>
      </div>
    }
  | {error} => {
      Js.log(error)
      <div> {React.string("Error!")} </div>
    }
  }
}

let default = make
