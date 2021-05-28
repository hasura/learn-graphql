module Button = {
  @module("react-bootstrap/Button") @react.component
  external make: (
    ~children: React.element,
    ~variant: string,
    ~id: string,
    ~className: string,
    ~onClick: 'c=?,
  ) => React.element = "default"
}

module Navbar = {
  @module("react-bootstrap/Navbar") @react.component
  external make: (~children: React.element, ~className: string) => React.element = "default"

  module Brand = {
    @module("react-bootstrap/NavbarBrand") @react.component
    external make: (~children: React.element) => React.element = "default"
  }

  module Collapse = {
    @module("react-bootstrap/NavbarCollapse") @react.component
    external make: (~children: React.element, ~className: string) => React.element = "default"
  }
}
