type auth0Hook = {loading: bool, logout: unit => unit}
@module("./Auth/react-auth0-spa") external useAuth0: unit => auth0Hook = "useAuth0"

let createApolloClient = authToken => {
  let headers = {
    "Authorization": `Bearer ${authToken}`,
  }

  let httpLink = ApolloClient.Link.HttpLink.make(
    ~uri=_ => "https://hasura.io/learn/graphql",
    ~headers=Obj.magic(headers),
    (),
  )

  let wsLink = {
    open ApolloClient.Link.WebSocketLink
    make(
      ~uri="wss://hasura.io/learn/graphql",
      ~options=ClientOptions.make(
        ~connectionParams=ConnectionParams(Obj.magic({"headers": headers})),
        ~reconnect=true,
        (),
      ),
      (),
    )
  }

  let terminatingLink = ApolloClient.Link.split(~test=({query}) => {
    let definition = ApolloClient.Utilities.getOperationDefinition(query)
    switch definition {
    | Some({kind, operation}) => kind === "OperationDefinition" && operation === "subscription"
    | None => false
    }
  }, ~whenTrue=wsLink, ~whenFalse=httpLink)

  let client = {
    open ApolloClient
    make(
      ~cache=Cache.InMemoryCache.make(),
      ~connectToDevTools=true,
      ~defaultOptions=DefaultOptions.make(
        ~mutate=DefaultMutateOptions.make(~awaitRefetchQueries=true, ()),
        (),
      ),
      ~link=terminatingLink,
      (),
    )
  }
  client
}

@react.component
let make = (~idToken) => {
  let {loading, logout} = useAuth0()
  if loading {
    <div> {React.string("Loading...")} </div>
  } else {
    let client = createApolloClient(idToken)
    <ApolloClient.React.ApolloProvider client={client}>
      <div>
        <Header logoutHandler={logout} />
        <div className="row container-fluid p-left-right-0 m-left-right-0">
          <div className="row col-md-9 p-left-right-0 m-left-right-0">
            <div className="col-md-6 sliderMenu p-30"> <TodoPrivateWrapper /> </div>
            <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
              <TodoPublicWrapper />
            </div>
          </div>
          <div className="col-md-3 p-left-right-0">
            <div className="col-md-12 sliderMenu p-30 bg-gray"> <OnlineUsersWrapper /> </div>
          </div>
        </div>
      </div>
    </ApolloClient.React.ApolloProvider>
  }
}

let default = make
