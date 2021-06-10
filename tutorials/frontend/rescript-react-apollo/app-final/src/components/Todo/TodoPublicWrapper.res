@react.component
let make = () => {
  <div className="todoWrapper">
    <div className="sectionHeader"> {React.string("Public feed realtime")} </div>
    <TodoInput isPublic={true} />
    <TodoPublicList />
  </div>
}

let default = make
