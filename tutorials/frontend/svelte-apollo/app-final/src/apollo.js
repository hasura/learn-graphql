import { split, HttpLink, InMemoryCache, ApolloClient } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

export function createApolloClient(authToken) {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  const httpLink = new HttpLink({
    uri: "https://hasura.io/learn/graphql",
    headers,
  });

  const wsLink = new WebSocketLink({
    uri: "wss://hasura.io/learn/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
}
