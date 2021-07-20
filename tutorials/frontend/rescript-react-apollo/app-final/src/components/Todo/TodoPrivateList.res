type todoPrivateListState = {
  filter: string,
  clearInProgress: bool,
}

let initialState = {
  filter: "all",
  clearInProgress: false,
}

// Remove all the todos that are completed
module ClearCompletedMutation = %graphql(`
  mutation clearCompleted {
    delete_todos(
      where: { is_completed: { _eq: true }, is_public: { _eq: false } }
    ) {
      affected_rows
    }
  }
`)

@react.component
let make = () => {
  let todosResult = TodosQuery.use()
  let (clearCompletedTodos, _clearCompletedTodosResult) = ClearCompletedMutation.use()
  let (state, setState) = React.useState(_ => initialState)

  let filterResults = filter => {
    setState(_ => {
      ...state,
      filter: filter,
    })
  }

  let clearCompleted = _e =>
    clearCompletedTodos(
      ~optimisticResponse=_variables => {
        delete_todos: Some(
          (
            {
              affected_rows: 1,
              __typename: "todos_mutation_response",
            }: ClearCompletedMutation.ClearCompletedMutation_inner.t_delete_todos
          ),
        ),
      },
      ~update=({readQuery, writeQuery}, {data: _data}) => {
        let existingTodos = readQuery(~query=module(TodosQuery), ())
        switch existingTodos {
        | Some(todosResult) =>
          switch todosResult {
          | Ok({todos}) => {
              let newTodos = Js.Array2.filter(todos, t => !t.is_completed)
              let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
            }
          | _ => ()
          }
        | None => ()
        }
      },
      (),
    )->ignore

  switch todosResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos}), error: None} => {
      let filteredTodos = switch state.filter {
      | "active" => Js.Array2.filter(todos, todo => todo.is_completed !== true)
      | "completed" => Js.Array2.filter(todos, todo => todo.is_completed === true)
      | _ => todos
      }

      let todoList = Js.Array2.mapi(filteredTodos, (todo, index) =>
        <TodoItem key={Js.Int.toString(index)} todo={todo} />
      )

      <React.Fragment>
        <div className="todoListWrapper"> <ul> {React.array(todoList)} </ul> </div>
        <TodoFilters
          todos={filteredTodos}
          currentFilter={state.filter}
          filterResultsFn={filterResults}
          clearCompletedFn={clearCompleted}
        />
      </React.Fragment>
    }
  | {error} => {
      Js.log(error)
      <div> {React.string("Error!")} </div>
    }
  }
}

let default = make
