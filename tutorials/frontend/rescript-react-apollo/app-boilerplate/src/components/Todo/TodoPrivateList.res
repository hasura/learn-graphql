type todoPrivateListState = {
  filter: string,
  clearInProgress: bool,
  todos: array<TodoItem.todo>,
}

let initialState = {
  filter: "all",
  clearInProgress: false,
  todos: [
    {
      id: "1",
      title: "This is private todo 1",
      is_completed: true,
      is_public: false,
    },
    {
      id: "2",
      title: "This is private todo 2",
      is_completed: false,
      is_public: false,
    },
  ],
}

@react.component
let make = () => {
  let (state, setState) = React.useState(_ => initialState)

  let filterResults = filter => {
    setState(_ => {
      ...state,
      filter: filter,
    })
  }

  let clearCompleted = e => ()

  // let filteredTodos = state.todos;
  // if (state.filter === "active") {
  //   filteredTodos = state.todos.filter((todo) => todo.is_completed !== true);
  // } else if (state.filter === "completed") {
  //   filteredTodos = state.todos.filter((todo) => todo.is_completed === true);
  // }

  let filteredTodos = switch state.filter {
  | "active" => Js.Array2.filter(state.todos, todo => todo.is_completed !== true)
  | "completed" => Js.Array2.filter(state.todos, todo => todo.is_completed === true)
  | _ => state.todos
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

let default = make
