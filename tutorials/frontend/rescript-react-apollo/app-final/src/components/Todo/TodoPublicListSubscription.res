

@react.component
let make = () => {
  let newTodoSubscriptionResult = NotifyNewPublicTodosSubscription.use()
  Js.log2(newTodoSubscriptionResult, "sub")
  switch newTodoSubscriptionResult {
  | {loading: true} => <div> {React.string("Loading...")} </div>
  | {data: Some({todos})} => <TodoPublicList latestTodo={todos[0]} />
  | {error: Some(_error)} => <div> {React.string("Error!")} </div>
  | {data: None, error: None, loading: false} => React.null
  }
}
