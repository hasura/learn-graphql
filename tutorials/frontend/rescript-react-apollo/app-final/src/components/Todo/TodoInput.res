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
  let refetchQuery = if isPublic {
    PublicTodosQuery.refetchQueryDescription()
  } else {
    TodosQuery.refetchQueryDescription()
  }
  <form
    className="formInput"
    onSubmit={e => {
      ReactEvent.Form.preventDefault(e)
      mutate(~update=(_cache, {data}) => {
        Js.log(data)
        resetInput()
      }, ~refetchQueries=[refetchQuery], {todo: todoInput, isPublic: isPublic})->ignore
      Js.log("end")
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
