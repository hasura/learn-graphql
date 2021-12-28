import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"

import { createApp, provide, h } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import routes from "~pages"
import { DefaultApolloClient } from "@vue/apollo-composable"

function getHeaders() {
    const headers = {}
    const token = window.localStorage.getItem("apollo-token")
    if (token) {
        headers.authorization = `Bearer ${token}`
    } else {
        console.log("no token")
        headers.authorization =
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYxY2I5MzI5ZGViNmI2MDA2OTgyMzBjMyJ9LCJuaWNrbmFtZSI6InJheS5nYXZpbjk3IiwibmFtZSI6InJheS5nYXZpbjk3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yZTI3ZTI3ZjNhMmE3MDZkMDg4NzNkZDU4ODI4ZmExNj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTI4VDIyOjQzOjU0LjAzMloiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MWNiOTMyOWRlYjZiNjAwNjk4MjMwYzMiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTY0MDczMTQzNiwiZXhwIjoxNjQwNzY3NDM2LCJhdF9oYXNoIjoib3RiZGs5dm5xYl8xWTJERFp1dW5IZyIsIm5vbmNlIjoiY2JocTgzNEtwaXN3cXdlX1lqVmJqfjBiZnBsbnRMbFUifQ.KqYcZPNOJscPNw81vuuCdnCA2V96WwycHC_eF6VpjXzE08aIFYfwj2pvrXyVIUmXoGLLrIoQR7BPBywu0q3S9oOfUBc2JLBQtdfdORbGLzjNfPqdCxjBjB5TE3Y4utI3AAh3o6KqivPaIzttwkiyuzawlCVqNkobeA53XFqTCegkTJ47tLjm5LTy0OgMrE4b41AC26uZtyDLdo-N4HthSBuBpn37KPe2U9CPFm-5oM10vY714gRrP269fwILT0Cm-gpIV7--c_DRhtHvJBg1t7JutE2V7AfEVD5oJ6bgdMqIEWBc-OHTeZzjP2vJHfB19oqnPcMVmbXw1mLq2TcjMg"
    }
    return headers
}

// Create an http link:
const httpLink = new HttpLink({
    uri: "httpS://hasura.io/learn/graphql",
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: "wss://hasura.io/learn/graphql",
    options: {
        reconnect: true,
        lazy: true,
        timeout: 30000,
        inactivityTimeout: 30000, // < --
        connectionParams: () => {
            return { headers: getHeaders() }
        },
    },
})

;(() => {
    wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
        wsLink.subscriptionClient.maxConnectTimeGenerator.max
})()

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpLink
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link,
    cache,
})

console.log(routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(router)
app.mount("#app")
