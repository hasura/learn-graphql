import fetch from 'isomorphic-unfetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { parseCookies } from 'nookies';
import auth0 from './auth0';

let accessToken = null

const requestAccessToken = async () => {
  if (accessToken) return

  const res = await fetch(`${process.env.APP_HOST}/api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = 'public'
  }
}

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
    accessToken = null
  }
})

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: 'https://hasura.io/learn/graphql',
    credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
  })
  return httpLink;
}

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient('wss://hasura.io/learn/graphql', {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken() // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      },
    })
  )
}

export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === 'undefined'
  let link
  if (ssrMode) {
    link = createHttpLink(headers)
  } else {
    link = createWSLink()
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}
