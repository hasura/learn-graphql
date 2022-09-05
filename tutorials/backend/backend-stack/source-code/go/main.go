package main

import (
	"log"
	"net/http"

	"github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/action"
	"github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/event"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/graph"
	"github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/graph/generated"
)

// HTTP server for the handler
func main() {
	mux := http.NewServeMux()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	mux.HandleFunc("/graphql", srv.ServeHTTP)

	mux.HandleFunc("/action", action.LoginHandler)

	mux.HandleFunc("/event", event.NewUserHandler)

	err := http.ListenAndServe(":3000", mux)
	log.Fatal(err)
}
