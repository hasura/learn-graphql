module AddTodoMutation = %graphql(`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: [{ title: $todo, is_public: $isPublic }]) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`)

@react.component
let make = (~isPublic=false) => {
  let (todoInput, setTodoInput) = React.useState(_ => "")
  let (mutate, _result) = AddTodoMutation.use()

  let resetInput = () => {
    setTodoInput(_ => "")
  }
  // let refetchQuery = if isPublic {
  //   PublicTodosQuery.refetchQueryDescription()
  // } else {
  //   TodosQuery.refetchQueryDescription()
  // }
  <form
    className="formInput"
    onSubmit={e => {
      ReactEvent.Form.preventDefault(e)
      mutate(~update=({readQuery, writeQuery}, {data}) => {
        if !isPublic {
          switch data {
          | Some({insert_todos}) =>
            switch insert_todos {
            | Some({returning}) =>
              let newTodo: TodosQuery.t_todos = {
                __typename: returning[0].__typename,
                id: returning[0].id,
                title: returning[0].title,
                created_at: returning[0].created_at,
                is_completed: returning[0].is_completed,
              }
              let existingTodosResponse = readQuery(~query=module(TodosQuery), ())
              switch existingTodosResponse {
              | Some(todosResult) =>
                switch todosResult {
                | Ok({todos}) => {
                    let newTodos = Js.Array2.concat([newTodo], todos)
                    let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
                  }
                | _ => ()
                }
              | None => ()
              }
            | None => ()
            }
          | None => ()
          }
        } else {
          ()
        }
      }, {todo: todoInput, isPublic: isPublic})->Js.Promise.then_(res => {
        resetInput()
        Js.Promise.resolve(res)
      }, _)->ignore
    }}>
    <input
      className="input"
      value={todoInput}
      placeholder="What needs to be done?"
      onChange={e => setTodoInput(ReactEvent.Form.target(e)["value"])}
    />
    <i className="inputMarker fa fa-angle-right" />
  </form>
}

let default = make
