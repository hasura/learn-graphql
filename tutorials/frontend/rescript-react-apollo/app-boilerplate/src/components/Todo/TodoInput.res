@react.component
let make = () => {
  <form
    className="formInput"
    onSubmit={e => {
      ReactEvent.Form.preventDefault(e)
    }}>
    <input className="input" placeholder="What needs to be done?" />
    <i className="inputMarker fa fa-angle-right" />
  </form>
}

let default = make
