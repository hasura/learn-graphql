---
title: "Go"
metaTitle: "GraphQL Server with Golang | Backend Tutorial"
metaDescription: "In this tutorial, learn how to integrate Go in a GraphQL backend server stack with Hasura"
---

## GraphQL server with Golang

Go is an open-source programming language supported by Google. Learn more at [the official website](https://go.dev/).

The following guide covers common backend application tasks, such as creating a GraphQL server with Go gqlgen and integrating a Go REST API into a unified GraphQL schema. We also go over how to integrate your Go app with Hasura.

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

- You will learn how to create a GraphQL server with Golang and gqlgen
- If you have an existing GraphQL API with Golang, you can integrate it with Hasura as a [Remote Schema](https://hasura.io/docs/latest/remote-schemas/index/) to get a unified GraphQL API.
- If you have an existing REST API with Golang, you can transform that declaratively to GraphQL without writing any code using [Hasura REST Connectors](https://hasura.io/docs/latest/actions/rest-connectors/).
- You can also re-use or custom write REST endpoints with Golang and map the endpoint to a GraphQL schema in Hasura.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out the [Hasura documentation](https://hasura.io/docs/latest/index/).

## Create a Go GraphQL Server with gqlgen

We can make a custom GraphQL server in Go using [gqlgen](https://gqlgen.com/)

1. Run the [gqlgen quickstart](https://gqlgen.com/#quick-start), skipping the first step.

2. In the `graph/schema.resolvers.go` Todos resolver return a placeholder test value.

   ```go
   func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
       return []*model.Todo{
           {
               ID:   "test",
               Text: "test",
               Done: false,
               User: &model.User{
                   ID:   "",
                   Name: "",
               },
           },
       }, nil
   }
   ```

3. Delete `server.go` and in `main.go` add the generated GraphQL handler

   ```go
   import (
    "log"
    "net/http"

    "github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/action"
    "github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/event"

    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/graph"
    "github.com/hasura/learn-graphql/tutorials/backend/backend-stack/source-code/graph/generated"
   )

   func main() {
       mux := http.NewServeMux()

       srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

       mux.HandleFunc("/graphql", srv.ServeHTTP)

       mux.HandleFunc("/action", action.LoginHandler)

       mux.HandleFunc("/event", event.NewUserHandler)

       err := http.ListenAndServe(":3000", mux)
       log.Fatal(err)
   }
   ```

### Golang GraphQL API Federation using Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/) to unify the GraphQL endpoint as a single endpoint.

1. In the Hasura Console Remote Schema tab, add your Go server `<Go server URL>/graphql`

2. In the API Explorer tab, try querying the sample todos.

   ```graphql
   query {
     todos {
       id
       text
       done
     }
   }
   ```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/go/go-remote-schema.png" alt="Hasura Remote Schemas with Go backend" />

## Convert a Go REST API Endpoint to GraphQL

In this section, we will write a REST Endpoint in Golang and see how to transform that to GraphQL. We will create a login POST endpoint that takes a username and password and returns an access code.

In our `main.go`, we use the standard library to create an HTTP server:

```go
package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/action", action.LoginHandler)

	err := http.ListenAndServe(":3000", mux)
	log.Fatal(err)
}
```

In `action/action.go`, we make the handler:

```go
package action

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type LoginResponse struct {
	AccessToken string
}

type Mutation struct {
	Login *LoginResponse
}

type loginArgs struct {
	Username string
	Password string
}

type ActionPayload struct {
	SessionVariables map[string]interface{} `json:"session_variables"`
	Input            loginArgs              `json:"input"`
}

type GraphQLError struct {
	Message string `json:"message"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	// set the response header as JSON
	w.Header().Set("Content-Type", "application/json")

	// read request body
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	// parse the body as action payload
	var actionPayload ActionPayload
	err = json.Unmarshal(reqBody, &actionPayload)
	if err != nil {
		http.Error(w, "invalid payload", http.StatusBadRequest)
		return
	}

	// Send the request params to the Action's generated handler function
	result, err := login(actionPayload.Input)

	// throw if an error happens
	if err != nil {
		errorObject := GraphQLError{
			Message: err.Error(),
		}
		errorBody, _ := json.Marshal(errorObject)
		w.WriteHeader(http.StatusBadRequest)
		w.Write(errorBody)
		return
	}

	// Write the response as JSON
	data, _ := json.Marshal(result)
	w.Write(data)

}

// Auto-generated function that takes the Action parameters and must return it's response type
func login(args loginArgs) (response LoginResponse, err error) {
	response = LoginResponse{
		AccessToken: "<sample value>",
	}
	return response, nil
}
```

### Add Go REST Endpoint to GraphQL schema using Hasura Actions

When writing a backend we usually have to write around 80% of our code doing boilerplate CRUD operations. Hasura helps us by autogenerating this part.

When we need to write custom business logic we can integrate our Go REST endpoint using [Hasura Actions](https://hasura.io/docs/latest/actions/index/), giving us the best of both worlds.

In the Actions tab on the Hasura Console we will set up a custom login function that calls the REST endpoint we created:

```graphql
type Mutation {
  login(username: String!, password: String!): LoginResponse
}
```

New types definition:

```graphql
type LoginResponse {
  AccessToken: String!
}
```

Create the action, click the `Codegen` tab, and select `go-serve-mux`.

Combine the two generated Go files into `main.go` then run `go run main.go`.

In the Hasura API explorer tab you should now be able to test it

```graphql
mutation {
  login(password: "password", username: "username") {
    AccessToken
  }
}
```

Result:

```json
{
  "data": {
    "login": {
      "AccessToken": "<sample value>"
    }
  }
}
```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/go/go-hasura-actions.png" alt="Hasura Actions with Go backend" />

### Run async scheduled events using a Go REST API and Hasura GraphQL

Databases like Postgres can run triggers when data changes, with [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can easily call an HTTP endpoint whenever we have one of these events.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

2.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

3.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We make a struct type in Go to represent this

    ```go
    type EventTriggerPayload[Old interface{}, New interface{}] struct {
        Event struct {
        	SessionVariables struct {
        		XHasuraRole string `json:"x-hasura-role"`
        	} `json:"session_variables"`
        	Op   string `json:"op"`
        	Data struct {
        		Old *Old `json:"old"`
        		New *New `json:"new"`
        	} `json:"data"`
        	TraceContext struct {
        		TraceID string `json:"trace_id"`
        		SpanID  string `json:"span_id"`
        	} `json:"trace_context"`
        } `json:"event"`
        CreatedAt    time.Time `json:"created_at"`
        ID           string    `json:"id"`
        DeliveryInfo struct {
        	MaxRetries   int `json:"max_retries"`
        	CurrentRetry int `json:"current_retry"`
        } `json:"delivery_info"`
        Trigger struct {
        	Name string `json:"name"`
        } `json:"trigger"`
        Table struct {
        	Schema string `json:"schema"`
        	Name   string `json:"name"`
        } `json:"table"`
    }
    ```

4.  Now we make an HTTP handler that handles the event

    ```go
    func NewUserHandler(w http.ResponseWriter, r *http.Request) {
        var u EventTriggerPayload[interface{}, struct {
            Id   string
            Name string
        }]
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        fmt.Println("Hello", u.Event.Data.New.Name)

        w.WriteHeader(200)
    }

    mux.HandleFunc("/event", event.NewUserHandler)
    ```

When you add a user in Hasura your Go server should receive the event.

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/go/go-event-triggers.png" alt="Hasura Event Triggers with Go backend" />

## Example: Querying GraphQL with Golang Client genqlient

To query a GraphQL endpoint from Go we use Khan Academy's [genqlient](https://github.com/Khan/genqlient) to generate a type-safe GraphQL client.

1. [Download your Hasura schema](https://hasura.io/docs/latest/graphql/core/guides/export-graphql-schema/#introduction)

   ```bash
   npx --yes graphqurl <Hasura URL>/v1/graphql --introspect > schema.graphql
   ```

2. Add your queries to `genqlient.graphql`

   ```graphql
   query GetUsers {
     user {
       id
       name
     }
   }
   ```

3. Create `genqlient.yaml`

   ```yaml
   schema: schema.graphql
   operations:
     - genqlient.graphql
   generated: generated/generated.go
   use_struct_references: true
   bindings:
     DateTime:
       type: time.Time
     uuid:
       type: string
     Int:
       type: int32
   ```

4. Install and run `genqlient`

   ```bash
   go get github.com/Khan/genqlient

   go run github.com/Khan/genqlient
   ```

5. To test if your setup is working, add a user, then query all users in the event trigger handler we created earlier

   ```go
   ctx := context.Background()
   client := graphql.NewClient("<Hasura URL>/v1/graphql", http.DefaultClient)
   resp, _ := generated.GetUsers(ctx, client)
   for _, value := range resp.GetUser() {
     fmt.Printf("%#v", value)
   }
   ```

## Summary

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us escape hatches for this custom logic. We've gone over a few ways you can use the power of Go.

See the [server source code on Github](https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/backend-stack/source-code/go).

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
