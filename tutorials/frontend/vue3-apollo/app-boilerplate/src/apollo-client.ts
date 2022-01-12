import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"

const TEST_AUTH_TOKEN =
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYxY2I5MzI5ZGViNmI2MDA2OTgyMzBjMyJ9LCJuaWNrbmFtZSI6InJheS5nYXZpbjk3IiwibmFtZSI6InJheS5nYXZpbjk3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yZTI3ZTI3ZjNhMmE3MDZkMDg4NzNkZDU4ODI4ZmExNj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTAxLTEyVDE1OjM5OjAxLjk1OFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MWNiOTMyOWRlYjZiNjAwNjk4MjMwYzMiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTY0MjAwMTk0MywiZXhwIjoxNjQyMDM3OTQzLCJhdF9oYXNoIjoieEtrNXlBR2hPOEdKak5MY1Vvb0xtdyIsIm5vbmNlIjoiSUQzZFNoVVZjWm1ORUwxaXN6VkhNQllRQ3Jsd0JsYWkifQ.Yah0U4wQ6p-qtZ84QHU7ub23vSNJ0m7-47OhciF0a-7oB3Nxn_sDVANR5Ar7VCEs72z717UUVonIPztbiyELXULXtLasaHeJj9IS-EeLuW0UMeBQ7Vq8bYF55eqSBxkL1DB-4H3_bJsEx8BUIXz44DB0Oe57jaVFGQ7eGc4SiQg40nhQeYd54H8w_kP0kWANlYL96lFXbvl-_7a6fzqwK25Q5LKwb-wytNP-lhqhaCu6Cr7jUX8IcL_bo0DMfFqCIHLVdoey9zl99LtVeJ6Op1A5jWJrCVvNyQAEHTDQ6luV5ukTdta3wnLhm56odTJzg2GpstJ6MrxwWwKP3JJJFQ"

function getHeaders() {
    const headers = {}
    const token = window.localStorage.getItem("apollo-token")
    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    } else {
        console.log("no token")
        headers["Authorization"] = TEST_AUTH_TOKEN
    }
    return headers
}

// Create an http link:
const httpLink = new HttpLink({
    uri: "httpS://hasura.io/learn/graphql",
    fetch: (uri: RequestInfo, options: RequestInit) => {
        options.headers = getHeaders()
        return fetch(uri, options)
    },
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: "wss://hasura.io/learn/graphql",
    options: {
        reconnect: true,
        lazy: true,
        timeout: 30000,
        inactivityTimeout: 30000,
        connectionParams: () => {
            return { headers: getHeaders() }
        },
    },
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link: split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === "OperationDefinition" && definition.operation === "subscription"
            )
        },
        wsLink,
        httpLink
    ),
})
