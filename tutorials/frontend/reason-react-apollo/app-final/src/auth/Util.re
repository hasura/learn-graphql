let saveSessionToStorage = (token, expiryDuration) => {
  Dom.Storage.(localStorage |> setItem("@hasura.io/learn:reason-apollo-token", token));
  let expiryTime = (Js.Date.now() /. 1000.0) +. float_of_string(expiryDuration)
    |> string_of_float;
  Dom.Storage.(localStorage |> setItem("@hasura.io/learn:reason-apollo-exp", expiryTime));
};

let getTokenFromStorage = () => {
  Dom.Storage.(localStorage |> getItem("@hasura.io/learn:reason-apollo-token"))
};

let removeSessionFromStorage = () => {
  Dom.Storage.(localStorage |> removeItem("@hasura.io/learn:reason-apollo-token"))
  Dom.Storage.(localStorage |> removeItem("@hasura.io/learn:reason-apollo-exp"))
};

let isSessionValid = () => {
  switch(Dom.Storage.(localStorage |> getItem("@hasura.io/learn:reason-apollo-exp"))) {
    | None => false
    | Some(expiryTime) => float_of_string(expiryTime) > Js.Date.now() /. 1000.0
  };
};