import {
  subscriptionExchange,
  defaultExchanges,
  ExchangeInput,
  errorExchange,
  fetchExchange,
  dedupExchange,
  cacheExchange,
} from "@urql/core";
import { withUrqlClient } from "next-urql";
import { createClient as createWSClient } from "graphql-ws";
import { ExchangeIO, createClient } from "urql";
import { useStore } from "../store/store";

const { logout } = useStore.getState();

const isServerSide = typeof window === "undefined";

const wsClient = () =>
  createWSClient({
    url: (process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string).replace(
      "http",
      "ws"
    ),
    connectionParams: async () => {
      const token = useStore.getState().user.token;

      return !isServerSide && token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
    },
  });

const noopExchange = ({ forward }: ExchangeInput): ExchangeIO => {
  return (operations$) => {
    const operationResult$ = forward(operations$);
    return operationResult$;
  };
};

const subscribeOrNoopExchange = () =>
  isServerSide
    ? noopExchange
    : subscriptionExchange({
        forwardSubscription: (operation) => {
          return {
            subscribe: (sink) => ({
              unsubscribe: wsClient().subscribe(operation, sink),
            }),
          };
        },
      });

const clientConfig = {
  url: process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
  fetchOptions: () => {
    const token = useStore.getState().user.token;

    return !isServerSide && token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    errorExchange({
      onError: (error) => {
        const isAuthError = error.graphQLErrors.some((e) => {
          return e.extensions?.code === "validation-failed";
        });
        if (isAuthError) {
          logout();
        }
      },
    }),
    fetchExchange,
    subscribeOrNoopExchange(),
  ],
};

export const client = createClient(clientConfig);

export default withUrqlClient((ssrExchange) => {
  const exchanges = [...clientConfig.exchanges, ssrExchange];
  return { ...client, exchanges };
});
