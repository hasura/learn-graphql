@react.component
let make = (~latestTodo: option<NotifyNewPublicTodosSubscription.Inner.t_todos>) => {
  let (newTodosCount, setNewTodosCount) = React.useState(() => 0)
  let (oldestTodoId, _) = React.useState(() => {
    switch latestTodo {
    | Some(todo) => todo.id + 1
    | None => 0
    }
  })

  let todosResult = PublicTodosQuery.use({
    before: Js.Option.some(oldestTodoId),
    after: None,
    limit: Js.Option.some(7),
  })
  let olderTodosAvailable = switch latestTodo {
  | Some(_) => true
  | None => false
  }
  let ref = React.useRef(latestTodo)

  React.useEffect1(() => {
    switch (latestTodo, ref.current) {
    | (Some(todo), Some(prevTodo)) =>
      if prevTodo.id !== todo.id {
        setNewTodosCount(prevNewTodosCount => prevNewTodosCount + 1)
      } else {
        ()
      }
    | (Some(_), None)
    | (None, Some(_)) =>
      setNewTodosCount(prevNewTodosCount => prevNewTodosCount + 1)
    | (None, None) => ()
    }
    ref.current = latestTodo
    None
  }, [latestTodo])

  switch todosResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos}), error: None, fetchMore} => {
      let loadNew = _e => {
        let newestTodoId =
          Js.Array.length(todos) > 0
            ? todos[0].id
            : switch latestTodo {
              | Some(todo) => todo.id
              | None => 0
              }

        fetchMore(
          ~updateQuery=(previousData, {fetchMoreResult}) => {
            setNewTodosCount(_ => 0)
            switch fetchMoreResult {
            | Some({todos: newTodos}) => {
                todos: Belt.Array.concat(newTodos, todos),
              }
            | None => previousData
            }
          },
          ~variables={
            after: Js.Option.some(newestTodoId),
            before: None,
            limit: None,
          },
          (),
        )->ignore
      }
      let loadOlder = _e => {
        let oldTodoId =
          Js.Array.length(todos) > 0
            ? todos[Js.Array2.length(todos) - 1].id
            : switch latestTodo {
              | Some(todo) => todo.id + 1
              | None => 0
              }

        fetchMore(
          ~updateQuery=(previousData, {fetchMoreResult}) => {
            switch fetchMoreResult {
            | Some({todos: newTodos}) => {
                todos: Belt.Array.concat(todos, newTodos),
              }
            | None => previousData
            }
          },
          ~variables={
            before: Js.Option.some(oldTodoId),
            after: None,
            limit: Js.Option.some(7),
          },
          (),
        )->ignore
      }

      let todoList = Js.Array2.mapi(todos, (todo, index) =>
        <TaskItem key={Js.Int.toString(index)} todo={todo} />
      )

      <div className="todoListWrapper">
        {newTodosCount > 0
          ? <div className="loadMoreSection" onClick={loadNew}>
              {React.string(`New tasks have arrived! (${Js.Int.toString(newTodosCount)})`)}
            </div>
          : React.null}
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
