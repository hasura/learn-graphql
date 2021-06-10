// @module external loading: string = "./loading.svg"
let loading = %raw("require('./loading.svg')")

@react.component
let make = () => {
  let style = ReactDOM.Style.make(
    ~position="absolute",
    ~display="flex",
    ~justifyContent="center",
    ~height="100vh",
    ~width="100vw",
    ~top="0px",
    ~bottom="0px",
    ~left="0px",
    ~right="0px",
    ~backgroundColor="white",
    (),
  )

  <div style> <img src=loading alt="loading" /> </div>
}

let default = make
