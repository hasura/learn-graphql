@react.component
let make = () => {
  let newTodoSubscriptionResult = NotifyNewPublicTodosSubscription.use()
  switch newTodoSubscriptionResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos})} =>
    <TodoPublicList latestTodo={Js.Array.length(todos) > 0 ? Some(todos[0]) : None} />
  | {error: Some(_error)} => <div> {React.string("Error!")} </div>
  | {data: None, error: None, loading: false} => React.null
  }
}
