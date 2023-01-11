import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "./Header";
import Login from "./Auth/Login";
import TodoPrivateWrapper from "./Todo/TodoPrivateWrapper";
import TodoPublicWrapper from "./Todo/TodoPublicWrapper";
import OnlineUsersWrapper from "./OnlineUsers/OnlineUsersWrapper";

import useAccessToken from "../hooks/useAccessToken";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://powerful-puma-81.hasura.app/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const App = () => {
  const idToken = useAccessToken();
  const { loading, logout } = useAuth0();
  const [client] = useState(createApolloClient(idToken));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!idToken) {
    return <Login />;
  }
  return (
    <ApolloProvider client={client}>
      <div>
        <Header logoutHandler={logout} />
        <div className="row container-fluid p-left-right-0 m-left-right-0">
          <div className="row col-md-9 p-left-right-0 m-left-right-0">
            <div className="col-md-6 sliderMenu p-30">
              <TodoPrivateWrapper />
            </div>
            <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
              <TodoPublicWrapper />
            </div>
          </div>
          <div className="col-md-3 p-left-right-0">
            <div className="col-md-12 sliderMenu p-30 bg-gray">
              <OnlineUsersWrapper />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
