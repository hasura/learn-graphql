module Router = {
  @module("react-router-dom") @react.component
  external make: (~children: React.element, ~history: 'c=?) => React.element = "Router"
}

module Route = {
  @module("react-router-dom") @react.component
  external make: (~path: string, ~render: 'c=?) => React.element = "Route"
}
