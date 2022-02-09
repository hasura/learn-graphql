import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"

const TEST_AUTH_TOKEN =
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYxY2I5MzI5ZGViNmI2MDA2OTgyMzBjMyJ9LCJuaWNrbmFtZSI6InJheS5nYXZpbjk3IiwibmFtZSI6InJheS5nYXZpbjk3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yZTI3ZTI3ZjNhMmE3MDZkMDg4NzNkZDU4ODI4ZmExNj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTAxLTEyVDE1OjM5OjAxLjk1OFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MWNiOTMyOWRlYjZiNjAwNjk4MjMwYzMiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTY0MjA5NDkzOSwiZXhwIjoxNjQyMTMwOTM5LCJhdF9oYXNoIjoia20tb0ZFLS1wcjhyaXdBQ244T1AzZyIsIm5vbmNlIjoiNGFPajg0SUtDfjIxZlJDb290NHpjdUk5QjdiOXhUVDAifQ.DmUM3W2Q9hQyQRcyjBIXPKTbVf62RqdKmllR4l48PAU6C2ffva6aRNfxAflrF-56w0UxxSROGvDuMG8k_JtUcyMS-EIiVWdn9O7M2Yi27eTy4S0wJX7x0TlDdgYQ3dD0khZ5NhrcG_PbLj8DFTI-0dr_XNHp2vOKot3e1Pk3mz-c8Km7YjmREcPAVg62reHrWglrvcnk2bXpvJBfHZY1U3OpECRR3TCywW3MWfeUFkIzZJKbTIZw_auawes9VpQLfP0ej9sgabYJDBJMy769_gyU8jXL2oJtwVxI_t7aEm0RqpsTbu1C7-xXhXWTyo3uN_LJ53vr448uJfUyYIzcNA"

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
    uri: "https://hasura.io/learn/graphql",
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

const errorLink = onError((error) => {
    //@ts-ignore
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link: errorLink.concat(
        split(
            // split based on operation type
            ({ query }) => {
                const definition = getMainDefinition(query)
                return (
                    definition.kind === "OperationDefinition" &&
                    definition.operation === "subscription"
                )
            },
            wsLink,
            httpLink
        )
    ),
})
