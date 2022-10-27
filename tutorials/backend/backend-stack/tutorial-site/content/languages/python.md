---
title: "Python"
metaTitle: "GraphQL Server with Python | Backend Tutorial"
metaDescription: "In this tutorial, learn how to integrate Python in a GraphQL backend server stack with Hasura"
---

## GraphQL server with Python

Python is a programming language that lets you work quickly and integrate systems more effectively. Learn more at [the official website](https://www.python.org/).

The following guide covers common backend application tasks, such as creating REST endpoints using [FastAPI](https://fastapi.tiangolo.com/). We also go over how to integrate your Python app with Hasura.

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

- You will learn how to create a GraphQL server with Python and Strawberry FastAPI.
- If you have an existing GraphQL API with Python, you can integrate it with Hasura as a [Remote Schema](https://hasura.io/docs/latest/remote-schemas/index/) to get a unified GraphQL API.
- If you have an existing REST API with Python, you can transform that declaratively to GraphQL without writing any code using [Hasura REST Connectors](https://hasura.io/docs/latest/actions/rest-connectors/).
- You can also re-use or custom write REST endpoints with Python and map the endpoint to a GraphQL schema in Hasura.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out the [Hasura documentation](https://hasura.io/docs/latest/index/).


## Create a Python GraphQL Server with Strawberry

We can make a custom GraphQL server in Python using [Strawberry](https://strawberry.rocks/) and connect it to Hasura using a [remote schema](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/).

1. Run the [Strawberry FastAPI quickstart](https://strawberry.rocks/docs/integrations/fastapi)

2. In `remoteSchema/remoteSchema.py` add the Strawberry code

   ```python
   import strawberry
   from strawberry.fastapi import GraphQLRouter


   @strawberry.type
   class Query:
       @strawberry.field
       def hello(self) -> str:
         return "Hello World"


   schema = strawberry.Schema(Query)

   graphql_app = GraphQLRouter(schema)
   ```

3. Add the generated GraphQL handler to `main.py`

   ```python
   from remoteSchema.remoteSchema import graphql_app


   app.include_router(graphql_app, prefix="/graphql")
   ```

### Python GraphQL API Federation using Hasura Remote Schema

We can connect our custom GraphQL server to Hasura using [remote schemas](https://hasura.io/docs/latest/graphql/core/remote-schemas/index/) to unify the GraphQL endpoint as a single endpoint.

1. In the Hasura Console remote schema tab, add your Python server `<Python server URL>/graphql`

2. In the API Explorer tab, try querying the sample todos.

   ```graphql
   {
     hello
   }
   ```

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/
backend-stack/python/python-remote-schema.png" alt="Hasura Remote Schema with Python backend" />

## Convert a Python REST API endpoint to GraphQL

In this section, we will write a REST Endpoint in Python using FastAPI and see how to transform that to GraphQL. We will create a login POST endpoint that takes a username and password and returns an access code.

In our `main.py`, we use FastAPI to create an HTTP server:

```python
from fastapi import FastAPI
from typing import Generic, TypeVar
from pydantic import BaseModel
from pydantic.generics import GenericModel
from action.loginTypes import LoginResponse, loginArgs
from event.event import Payload
from remoteSchema.remoteSchema import graphql_app
from qlient.aiohttp import AIOHTTPClient, GraphQLResponse

ActionInput = TypeVar("ActionInput", bound=BaseModel | None)


class ActionName(BaseModel):
    name: str


class ActionPayload(GenericModel, Generic[ActionInput]):
    action: ActionName
    input: ActionInput
    request_query: str
    session_variables: dict[str, str]


app = FastAPI()


@app.post("/action")
async def actionHandler(action: ActionPayload[loginArgs]) -> LoginResponse:
    action.input
    return LoginResponse(AccessToken="<sample value>")
```

In `action/action.py`, we create the handler:

```python
from enum import Enum, auto
from pydantic import BaseModel


class LoginResponse(BaseModel):
    AccessToken: str


class Mutation(BaseModel):
    login: LoginResponse | None


class loginArgs(BaseModel):
    username: str
    password: str
```

Install the dependencies and run the app

```bash
pip install "fastapi[all]"

uvicorn main:app --reload
```

### Add Python REST Endpoint to GraphQL schema using Hasura Actions

When writing a backend we usually have to write around 80% of our code doing boilerplate CRUD operations. Hasura helps us by autogenerating this part.

When we need to write custom business logic we can integrate our Python REST endpoint using [Hasura Actions](https://hasura.io/docs/latest/actions/index/), giving us the best of both worlds.

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

Create the action, click the `Codegen` tab, and select `python-fast-api`.

Copy `login.py` to `main.py` and `loginTypes.py` in your project.

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

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/python/python-hasura-actions.png" alt="Hasura Actions with Python backend" />

### Run async scheduled events using a Python REST API and Hasura GraphQL

Databases like Postgres can run triggers when data changes, with [Hasura event triggers](https://hasura.io/docs/latest/event-triggers/index/) we can easily call an HTTP endpoint whenever we have one of these events.

Let's send a webhook when a new user is created and print out their name.

1.  In the Hasura Console add a `user` table with a `Text` column `name` and the frequently used `UUID` column id.

2.  In the event trigger tab, on the `user` table, check the insert and via console trigger operations.

3.  The event trigger payload schema can be found [in the docs](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload). We make pydantic classes in Python to represent this

    ```python
    from pydantic import BaseModel, Field
    from pydantic.generics import GenericModel
    from typing import Generic, Literal, TypeVar

    New = TypeVar("New", bound=BaseModel | None)
    Old = TypeVar("Old", bound=BaseModel | None)


    class DeliveryInfo(BaseModel):
        current_retry: int
        max_retries: int


    class Data(GenericModel, Generic[New, Old]):
        new: New
        old: Old


    class TraceContext(BaseModel):
        span_id: str
        trace_id: str


    class Event(GenericModel, Generic[New, Old]):
        data: Data[New, Old]
        op: Literal["INSERT", "UPDATE", "DELETE", "MANUAL"]
        session_variables: dict[str, str]
        trace_context: TraceContext


    class Table(BaseModel):
        name: str
        schema_: str = Field("", alias="schema")


    class Trigger(BaseModel):
        name: str


    class Payload(GenericModel, Generic[New, Old]):
        created_at: str
        delivery_info: DeliveryInfo
        event: Event[New, Old]
        id: str
        table: Table
        trigger: Trigger

    ```

4.  Now we make an HTTP handler that handles the event

    ```python
    from event import Payload
    class UserTable(BaseModel):
      id: str
      name: str


    @app.post("/event")
    async def actionHandler(action: Payload[UserTable, None]):
        return
    ```

When you add a user in Hasura your Python server should receive the event.

<img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/python/python-event-triggers.png" alt="Hasura Event Triggers with Python backend" />

## Example: Querying GraphQL with Python Client qlient

To query a GraphQL endpoint from Python we use the async version of [qlient](https://github.com/qlient-org/python-qlient).

1. Install qlient

   ```bash
   pip install qlient.aiohttp
   ```

2. Query all users in the event trigger handler we created earlier,

   ```python
   @app.post("/event")
   async def actionHandler(action: Payload   [UserTable, None]):
       async with AIOHTTPClient("http://localhost:8080/v1/graphql") as client:
           result: GraphQLResponse = await client.query.user(["id", "name"])
           print(result.request.query)
           print(result.data)
       return
   ```

## Summary

When developing backend applications, we may need to write custom business logic. When we use Hasura, it autogenerates most of our API but gives us escape hatches for this custom logic. We've gone over a few ways you can use the power of Python.

See the [the server source code on Github](https://github.com/hasura/learn-graphql/backend/backend-stack/tutorial-site/source-code/python).

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
