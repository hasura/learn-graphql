@react.component
let make = (
  ~todos: array<TodosQuery.Inner.t_todos>,
  ~currentFilter,
  ~filterResultsFn,
  ~clearCompletedFn,
) => {
  let filterResultsHandler = filter => {
    e => {
      filterResultsFn(filter)
    }
  }

  // The clear completed button if these are personal todos
  let clearCompletedButton =
    <button onClick={clearCompletedFn} className="clearComp">
      {React.string("Clear completed")}
    </button>

  let activeTodos = Js.Array2.filter(todos, todo => todo.is_completed !== true)

  let itemCount = switch currentFilter {
  | "active" => Js.Array.length(activeTodos)
  | "completed" => Js.Array.length(todos) - Js.Array.length(activeTodos)
  | _ => Js.Array.length(todos)
  }

  <div className="footerList">
    <span>
      {React.string(` ${Js.Int.toString(itemCount)} item ${itemCount !== 1 ? "s" : ""} `)}
    </span>
    <ul>
      <li onClick={filterResultsHandler("all")}>
        <a className={currentFilter === "all" ? "selected" : ""}> {React.string("All")} </a>
      </li>
      <li onClick={filterResultsHandler("active")}>
        <a className={currentFilter === "active" ? "selected" : ""}> {React.string("Active")} </a>
      </li>
      <li onClick={filterResultsHandler("completed")}>
        <a className={currentFilter === "completed" ? "selected" : ""}>
          {React.string("Completed")}
        </a>
      </li>
    </ul>
    {clearCompletedButton}
  </div>
}

let default = make
