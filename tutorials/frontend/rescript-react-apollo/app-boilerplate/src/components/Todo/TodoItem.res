type todo = {
  id: string,
  is_completed: bool,
  title: string,
  is_public: bool,
}

@react.component
let make = (~todo) => {
  let removeTodo = e => {
    ReactEvent.Mouse.preventDefault(e)
    ReactEvent.Mouse.stopPropagation(e)
  }

  <li>
    <div className="view">
      <div className="round">
        <input checked={todo.is_completed} type_="checkbox" id={todo.id} />
        <label htmlFor={todo.id} />
      </div>
    </div>
    <div className={"labelContent" ++ (todo.is_completed ? " completed" : "")}>
      <div> {todo.title->React.string} </div>
    </div>
    <button className="closeBtn" onClick={removeTodo}> {"x"->React.string} </button>
  </li>
}

let default = make
