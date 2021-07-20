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
  let (removeTodoMutate, _removeTodoResult) = RemoveTodoMutation.use()
  let (toggleTodoMutate, _toggleTodoResult) = ToggleTodoMutation.use()

  let removeTodo = e => {
    ReactEvent.Mouse.preventDefault(e)
    ReactEvent.Mouse.stopPropagation(e)
    removeTodoMutate(
      ~optimisticResponse=_variables => {
        delete_todos: Some(
          (
            {
              affected_rows: 1,
              __typename: "todos_mutation_response",
            }: RemoveTodoMutation.RemoveTodoMutation_inner.t_delete_todos
          ),
        ),
      },
      ~update=({readQuery, writeQuery}, {data: _data}) => {
        let existingTodos = readQuery(~query=module(TodosQuery), ())
        switch existingTodos {
        | Some(todosResult) =>
          switch todosResult {
          | Ok({todos}) => {
              let newTodos = Js.Array2.filter(todos, t => t.id !== todo.id)
              let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
            }
          | _ => ()
          }
        | None => ()
        }
      },
      {id: todo.id},
    )->ignore
  }

  let toggleTodo = _e => {
    toggleTodoMutate(
      ~optimisticResponse=_variables => {
        update_todos: Some(
          (
            {
              affected_rows: 1,
              __typename: "todos_mutation_response",
            }: ToggleTodoMutation.ToggleTodoMutation_inner.t_update_todos
          ),
        ),
      },
      ~update=({readQuery, writeQuery}, {data: _data}) => {
        let existingTodos = readQuery(~query=module(TodosQuery), ())
        switch existingTodos {
        | Some(todosResult) =>
          switch todosResult {
          | Ok({todos}) => {
              let newTodos = Js.Array2.map(todos, t => {
                if t.id == todo.id {
                  {...t, is_completed: !t.is_completed}
                } else {
                  t
                }
              })
              let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
            }
          | _ => ()
          }
        | None => ()
        }
      },
      {
        id: todo.id,
        isCompleted: !todo.is_completed,
      },
    )->ignore
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
