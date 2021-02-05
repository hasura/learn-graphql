var apolloClient = require("apollo-client")
var apolloLinkWS = require('apollo-link-ws')
var apolloCacheInMemory = require("apollo-cache-inmemory")
var gql = require('graphql-tag')

var GRAPHQL_URI = 'hasura.io/learn/graphql'

const getClient = (token) => {
    const wsLink = new apolloLinkWS.WebSocketLink({
        uri: `wss://${GRAPHQL_URI}`,
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            }
        }
    });

    const client = new apolloClient.ApolloClient({
        link: wsLink,
        cache: new apolloCacheInMemory.InMemoryCache({
            addTypename: true
        })
    });
    return client;
};

document.addEventListener("DOMContentLoaded", function() {
    var app = Elm.Main.init({node: document.getElementById('app')})

    app.ports.storeToken.subscribe(function(token) {
        localStorage.setItem('token', token)
    })
    app.ports.removeTokenFromStarage.subscribe(function() {
        localStorage.removeItem('token')
    })
    var token = localStorage.getItem('token')
    if ( token ) {
        app.ports.gotStoredToken.send(token)
    }

    app.ports.createSubscriptionToOnlineUsers.subscribe(function(data) {
        /* Initiate subscription request */
        var [ data, authToken ] = data;
        if (authToken.length > 0) {
          getClient(authToken).subscribe({
            query: gql`${data}`,
            variables: {}
          }).subscribe({
            next(resp) {
              app.ports.gotOnlineUsers.send(resp);
            },
            error(err) {
              console.log('error is');
              console.log(err);
            }
          });
        }
    });

    app.ports.createSubscriptionToPublicTodos.subscribe(function(data) {
        /* Initiate subscription request */
        var [ data, authToken ] = data;
        if (authToken.length > 0) {
          // app.ports.creatingSubscriptionToTasks.send(1);
          getClient(authToken).subscribe({
            query: gql`${data}`,
            variables: {}
          }).subscribe({
            next(resp) {
              app.ports.gotRecentPublicTodoItem.send(resp);
            },
            error(err) {
              console.log('error is');
              console.log(err);
            }
          });
        }
      });
})