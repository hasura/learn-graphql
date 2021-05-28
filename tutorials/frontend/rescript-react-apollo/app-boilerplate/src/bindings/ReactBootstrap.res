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
