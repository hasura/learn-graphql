module RemoveTodoMutation = %graphql(`
    mutation removeTodo($id: Int!) {
      delete_todos(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `)

module ToggleTodoMutation = %graphql(`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `)

@react.component
let make = (~todo: TodosQuery.Inner.t_todos) => {
  let todosResult = TodosQuery.use()
  let (removeTodoMutate, _removeTodoResult) = RemoveTodoMutation.use()
  let (toggleTodoMutate, _toggleTodoResult) = ToggleTodoMutation.use()

  let removeTodo = e => {
    ReactEvent.Mouse.preventDefault(e)
    ReactEvent.Mouse.stopPropagation(e)
    // removeTodoMutate(~update=(cache, {data, error}) => {
    //   Js.log("update start")
    //   let existingTodos = cache.readQuery(~query=module(TodosQuery), ())
    //   Js.log("update end")
    //   Js.log(existingTodos)
    // }, ~refetchQueries=[TodosQuery.refetchQueryDescription()], {id: todo.id})->ignore
    removeTodoMutate(~refetchQueries=[TodosQuery.refetchQueryDescription()], {id: todo.id})->ignore
  }

  let toggleTodo = _e => {
    switch todosResult {
    | {data: Some({todos})} => {
        let matchedTodoOrNone = Js.Array2.find(todos, t => t.id == todo.id)
        switch matchedTodoOrNone {
        | Some(matchedTodo) =>
          toggleTodoMutate(
            ~refetchQueries=[TodosQuery.refetchQueryDescription()],
            {
              id: todo.id,
              isCompleted: !matchedTodo.is_completed,
            },
          )->ignore
        | None => ()
        }
      }
    | _ => ()
    }
  }

  <li>
    <div className="view">
      <div className="round">
        <input
          checked={todo.is_completed}
          type_="checkbox"
          id={Js.Int.toString(todo.id)}
          onChange={toggleTodo}
        />
        <label htmlFor={Js.Int.toString(todo.id)} />
      </div>
    </div>
    <div className={"labelContent" ++ (todo.is_completed ? " completed" : "")}>
      <div> {todo.title->React.string} </div>
    </div>
    <button className="closeBtn" onClick={removeTodo}> {"x"->React.string} </button>
  </li>
}

let default = make
