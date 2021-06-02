@react.component
let make = () => {
  let todosResult = PublicTodosQuery.use()

  switch todosResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos}), error: None} => {
      let todoList = Js.Array2.mapi(todos, (todo, index) =>
        <TaskItem key={Js.Int.toString(index)} todo={todo} />
      )

      <div className="todoListWrapper"> <ul> {React.array(todoList)} </ul> </div>
    }
  | {error} => {
      Js.log(error)
      <div> {React.string("Error!")} </div>
    }
  }
}

let default = make
