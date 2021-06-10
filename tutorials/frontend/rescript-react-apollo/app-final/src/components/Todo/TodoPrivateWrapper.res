@react.component
let make = () => {
  <div className="todoWrapper">
    <div className="sectionHeader"> {React.string("Personal todos")} </div>
    <TodoInput isPublic={false} />
    <TodoPrivateList />
  </div>
}
let default = make
