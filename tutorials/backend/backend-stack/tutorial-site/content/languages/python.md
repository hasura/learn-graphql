---
title: "GraphQL with Python: Tutorial with server and API examples"
metaTitle: "GraphQL with Python: Tutorial with server and API examples"
metaDescription: "In this tutorial, learn how to integrate Python with GraphQL using various frameworks like Graphene and Strawberry along with performance and security considerations."
---

In recent years, GraphQL has gained significant traction among Python developers seeking more efficient ways to build and consume APIs. This query language for APIs offers a fresh approach to data fetching and manipulation, particularly appealing in Python's versatile ecosystem.

> New to GraphQL? Check out the [Introduction to GraphQL](https://hasura.io/learn/graphql/intro-graphql/introduction/) tutorial to learn the core concepts quickly.

## Understanding GraphQL in the Python Ecosystem

Python's ecosystem provides an interesting playground for GraphQL implementation:

- Extensive Library Support: Libraries like Graphene and Ariadne facilitate smooth GraphQL integration.
- Scalability: Python's scalability complements GraphQL's efficient data loading.

Ready to explore GraphQL with Python? The next section will guide you through setting up your first Python GraphQL server, demonstrating how they can work together effectively.

## Setting Up a Python GraphQL Server

Implementing a GraphQL server in Python is a fairly standard process, thanks to the ecosystem of libraries and tools available. This section will guide you through the essentials of setting up a Python GraphQL server, highlighting various approaches to get your API up and running quickly.

### Choosing Your GraphQL Framework in Python

Fundamentally, you can build a GraphQL server with schema first, code first or a domain driven approach. Several Python frameworks support GraphQL implementation. Here are some popular options:

- **Graphene**: A Python library for building GraphQL schemas/types.
- **Strawberry**: A new library for creating GraphQL APIs using Python type hints.
- **Ariadne**: A schema-first GraphQL library for Python.
- **graphql-core**: Python reference implementation of the GraphQL spec.

Graphene is one of the most widely used schema first GraphQL libraries for Python. 

- Object-oriented schema definition
- Integration with popular web frameworks (Django, Flask)
- Support for relay specification

Strawberry is a library that leverages Python's type hints for GraphQL schema definition.

- Type-first approach using Python 3.7+ type hints
- Code-first schema definition
- Built-in support for dataclasses

There are some parameters to look at while choosing the right library/framework for building a GraphQL server in Python.

Choosing the right Python GraphQL library/framework:

- For Django/Flask Integration: Consider Graphene
- For Schema-First Approach: Look at Ariadne
- For Type Hints and Modern Python: Try Strawberry
- For Low-Level Control: Use graphql-core
- For domain-driven: Use Hasura for bootstrapping the API and integrate Python for business logic

Each has its pros and cons, but for this guide, we'll focus on Graphene and Strawberry due to its widespread adoption and extensive documentation.

### Creating a Python GraphQL Server with Graphene

1. First, set up a virtual environment and install the necessary packages:

```bash
python -m venv graphql_env
source graphql_env/bin/activate  # On Windows, use `graphql_env\Scripts\activate`
pip install graphene Flask graphene-flask
```

2. Define your GraphQL schema using Graphene:

```python
import graphene

class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.String(default_value="World"))

    def resolve_hello(self, info, name):
        return f'Hello {name}'

schema = graphene.Schema(query=Query)
```

3. Integrate your GraphQL schema with Flask:

```python
from flask import Flask
from flask_graphql import GraphQLView

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(debug=True)
```

4. Run your GraphQL server:

```bash
python app.py
```

Visit http://localhost:5000/graphql to access the GraphiQL interface.

### Create a Python GraphQL Server with Strawberry

We can make a custom GraphQL server in Python using [Strawberry](https://strawberry.rocks/). 

1. Run the [Strawberry FastAPI quickstart](https://strawberry.rocks/docs/integrations/fastapi)

2. In `remoteSchema.py` add the Strawberry code

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
   from remoteSchema import graphql_app

   app.include_router(graphql_app, prefix="/graphql")
   ```

While the above setup works for a simple Hello World API, it's worth considering more efficient approaches:

**Schema Generation**: Instead of manually defining resolvers, consider tools that can generate schemas from your database models.
**Batched Resolvers**: Implement batching to reduce the number of database queries.
**Caching**: Implement a caching layer to improve performance for frequently accessed data.

- How do I handle authentication in my GraphQL server?
Implement authentication middleware in your Flask app and access it within your resolvers.

- Can I use async/await with Python GraphQL servers?
Yes, libraries like Ariadne support asynchronous resolvers for improved performance.

- How do I connect my GraphQL server to a database?
You can use ORMs like SQLAlchemy or integrate directly using database-specific Python libraries.

The key to a successful GraphQL implementation lies in understanding your data relationships and designing your API thoughtfully.

### Implementing mutations with Python

In this section, we will explore how to implement and use mutations in a Python GraphQL environment, emphasizing best practices for data modification.

A typical GraphQL mutation will look like this:

```graphql
mutation createUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
```

The simplest prototype implementation of this mutation in Graphene will look like this:

```python
import graphene

class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(lambda: User)

    def mutate(self, info, name, email):
        user = User(name=name, email=email)
        # Add logic to save user to database
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(mutation=Mutation)
```

The logic to save user to the database will include ORM library usage and client SDKs to various databases.

Some of the Best Practices for Mutations:

- **Input Validation**: Always validate input data before processing.
- **Error Handling**: Provide clear error messages for failed mutations.
- **Atomicity**: Ensure that mutations are atomic - they should either complete fully or not at all.
- **Return Updated Data**: Return the modified object in the mutation response.

One of the way to optimize for performance is to batch the mutations: Group related mutations to reduce network requests.

What are the different ways to optimize mutation execution?

While manually implementing mutations works well for many cases, consider leveraging tools that can:

- Automatically generate CRUD mutations based on your data model 
- Handle authentication and authorization checks
- Provide real-time updates to subscribed clients

For instance, some advanced GraphQL engines can automatically create efficient mutations from your database schema, reducing boilerplate code and ensuring consistency between your data layer and API. Hasura does this across any data source, for example.

## Building a Python GraphQL Application: A Tutorial

In this section, we'll walk through creating a simple yet functional GraphQL application using Python. This tutorial will demonstrate how to set up a GraphQL server, define a schema, and implement queries and mutations.

Let's setup the project environment:

```bash
mkdir python-graphql-tutorial
cd python-graphql-tutorial
python -m venv venv
source venv/bin/activate
pip install flask graphene flask-graphql
```

We'll create a simple book library application. Here's the structure:

```bash
python-graphql-tutorial/
├── app.py
└── models.py
```

We will start by defining data models. In models.py, we'll define our data models:

```python
class Author:
    def __init__(self, id, name):
        self.id = id
        self.name = name

class Book:
    def __init__(self, id, title, author_id):
        self.id = id
        self.title = title
        self.author_id = author_id

# Sample data
authors = [
    Author(1, "J.K. Rowling"),
    Author(2, "J.R.R. Tolkien")
]

books = [
    Book(1, "Harry Potter and the Philosopher's Stone", 1),
    Book(2, "The Hobbit", 2)
]
```

In app.py, let's create the GraphQL schema:

```python
from flask import Flask
from flask_graphql import GraphQLView
import graphene
from models import Author, Book, authors, books

class AuthorType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()

class BookType(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    author = graphene.Field(AuthorType)

    def resolve_author(self, info):
        return next(author for author in authors if author.id == self.author_id)

class Query(graphene.ObjectType):
    books = graphene.List(BookType)
    authors = graphene.List(AuthorType)

    def resolve_books(self, info):
        return books

    def resolve_authors(self, info):
        return authors

schema = graphene.Schema(query=Query)

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

if __name__ == '__main__':
    app.run(debug=True)
```

Now, we can run the app `python app.py`. Visit `http://localhost:5000/graphiql` to start exploring the queries. You can try out the following query:

```graphql
query {
  books {
    id
    title
    author {
      name
    }
  }
}
```

Let's add the ability to create new books. Update `app.py`:

```python
class CreateBook(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author_id = graphene.Int(required=True)

    book = graphene.Field(lambda: BookType)

    def mutate(self, info, title, author_id):
        book = Book(id=len(books) + 1, title=title, author_id=author_id)
        books.append(book)
        return CreateBook(book=book)

class Mutation(graphene.ObjectType):
    create_book = CreateBook.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
```

You can try out the following mutation to create a new book:

```graphql
mutation {
  createBook(title: "The Hitchhikers Guide", authorId: 2) {
    book {
      id
      title
      author {
        name
      }
    }
  }
}
```

For the above queries to be performant, you might have to implement DataLoader to batch and cache database queries for better performance.

- How can I connect this to a real database?
Replace the in-memory lists with database queries using an ORM like SQLAlchemy.

- Can I add authentication to this API?
Yes, you can implement authentication middleware in Flask and access it in your resolvers.

- How do I handle file uploads?
Use libraries like graphene-file-upload to handle file uploads in mutations.

## GraphQL Queries with Python

A GraphQL query in Python (or any language/framework) typically consists of three main components:

- The query string
- Variables (optional)
- The execution method

Let's break these down:

Here's how a query string would look like:

```graphql
query getUser($id: String!) {
  user(id: $id) {
    name
    email
    posts {
      title
    }
  }
}
```

The variable for the above query can be defined in Python as:

```python
variables = {
    "id": "123"
}
```

Once we have these defined, the execution depends on how the GraphQL server is exposing the API. Typically the API is exposed as a HTTP endpoint or Websocket (in case of a realtime app). In this example, let's look at HTTP request execution with Python.

### Executing GraphQL queries using Python requests library

The execution in Python for the GraphQL query will be as follows:

```python
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

transport = RequestsHTTPTransport(url='http://your-graphql-endpoint')
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql('''
    query getUser($id: String!) {
        user(id: $id) {
            name
            email
            posts {
                title
            }
        }
    }
''')

result = client.execute(query, variable_values=variables)
print(result)
```

- How do I handle errors in GraphQL queries?
GraphQL returns errors in a standardized format. Check the `errors` key in the response.

- Can I use GraphQL queries with asynchronous Python code?
Yes, libraries like `gql` support async operations with asyncio.

## FAQs

- Is GraphQL suitable for all Python projects?
While not universal, GraphQL can benefit projects of various sizes, especially those requiring flexible data fetching.

- How does GraphQL handle database operations in Python?
GraphQL itself is database-agnostic. Tools like Hasura can auto-generate GraphQL APIs from your database schema, simplifying the process.

- Can GraphQL improve API performance in Python applications?
Yes, by reducing over-fetching and allowing batched queries, GraphQL can significantly enhance API efficiency.

## Summary

As we've explored throughout this post, GraphQL offers significant advantages for building flexible and efficient APIs in Python ecosystems. However, the traditional resolver-based approach, while intuitive, often leads to performance challenges and increased complexity as applications scale. This is where domain-driven compiler-style GraphQL APIs shine, providing a superior solution for Python developers looking to harness the full power of GraphQL.

> New to Hasura? The Hasura GraphQL Engine makes your data instantly accessible over a real-time GraphQL API so that you can build and ship modern, performant apps and APIs 10x faster. Hasura connects to your databases, REST and GraphQL endpoints, and third-party APIs to provide a unified, connected, real-time, secured GraphQL API for all your data. Check out the [Hasura documentation](https://hasura.io/docs/latest/index/).

See the [server source code on Github](https://github.com/hasura/learn-graphql/tree/master/tutorials/backend/backend-stack/source-code/python).

If you use Hasura and are ready to go to production, check out Hasura Cloud for a fully managed Hasura deployment.

<a target="_blank" rel="noopener" href="https://cloud.hasura.io"><img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/global/deploy-to-hasura.png" /></a>
