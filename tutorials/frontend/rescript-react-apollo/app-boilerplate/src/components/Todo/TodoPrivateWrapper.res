@react.component
let make = () => {
  <div className="todoWrapper">
    <div className="sectionHeader"> {React.string("Personal todos")} </div>
    <TodoInput />
    <TodoPrivateList />
  </div>
}
let default = make
