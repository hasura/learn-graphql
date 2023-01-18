---
title: GraphQL Queries - Fetching data
metaTitle: "GraphQL Queries to fetch data | GraphQL Tutorial"
metaDescription: "Try out GraphQL Query using GraphiQL. Simple and nested GraphQL query examples with parameters, arguments and variables to fetch data dynamically"
---

## What is a GraphQL Query? {#what-is-a-graphql-query}

In GraphQL, you fetch data with the help of queries. A query is a GraphQL Operation that allows you to retrieve specific data from the server.

Let’s look at the following GraphQL query:

```graphql
{
  todos {
    title
  }
}
```

We ask the server for all the todos and their titles in the above query. The “`todos`" represents an object and "`title`" a **field**. All queries consist of an object and one or more fields.

The fields tell the server what information to return for the specified object.

## GraphQL Query Example {#graphql-query-example}

Executing the above query would return the following response:

```graphql
{
  "data": {
    "todos": [
      {
        "title": "Learn GraphQL"
      },
      {
        “title": “Learn about queries"
      }
    ]
  }
}
```

The query and the result have the same format, demonstrating that you always get what you ask for in GraphQL. You only asked for the title, which means you will only get the title — nothing more, nothing less.

There are two other types of queries - anonymous and named.

1\. Anonymous queries

```graphql
query {
  todos {
    title
  }
}
```

This is similar to the first query.

2\. Named queries

```graphql
query getTodos {
  todos {
    title
  }
}
```

It’s considered best practice to name all your GraphQL operations because it helps people understand their purpose and helps when debugging.

In the next section, you will run queries and practice what you learnt.

## Try Out GraphQL Queries {#try-out-graphql-queries}

For this tutorial we've set up a GraphQL API for you. The most common
way to browse a GraphQL API is to use GraphiQL. GraphiQL is a tool
built by Facebook, (pronounced "graphical") that makes it easy to explore
any GraphQL API.

When you connect GraphiQL to a GraphQL endpoint, it
queries the server for its GraphQL schema and gives you a UI to browse
and test queries, and that powers its amazing autocomplete!

![GraphiQL demo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

Tools like GraphiQL make GraphQL APIs really easy
to use and integrate APIs in your app without requiring
external documentation tools.

You can access the GraphiQL for this realtime todo app tutorial here:
[hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

When you work with a GraphQL API in a project you will almost always
use a tool like GraphiQL to explore and test your GraphQL queries.

## Run the GraphQL Query {#basic-graphql-query}

1. Open GraphiQL at: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql). 
   You'll have to login to get an auth token to query the API. In a real-world scenario
   your GraphQL APIs will be protected.
2. You'll see a URL, and headers that contain the auth
   token that will be sent along with your GraphQL query.
3. Now, paste this GraphQL query in the GraphiQL window

```graphql
 query {
   users {
     name
   }
 }
```

4. Hit `ctrl + enter` or `cmd + enter` (mac) or click on the ▶️ icon to run the GraphQL query
5. On the right, you should see a list of users by their names that are in the system!

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

Recall that there is no magic here! The hosted GraphiQL app is sending a GraphQL query string
to the server at the given endpoint with the HTTP headers. The server then sends the response
that you see on the right hand side.

## GraphQL Nested Query {#graphql-nested-query}

The todo application has:
* users
* todos
* information about users that are currently online

This is what the API "schema" looks like:

![Schema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

The schema is a graph-like schema where all the 3 models are linked to each other. Since all 3 models are linked, we can use nested queries. GraphQL nested queries allow you to fetch relational data in one request.

In the context of the todo application, you can fetch the users and their todos in one request with nested queries.

**How is that possible?**

Nested queries in GraphQL are possible due to the relationships between objects. When you build a GraphQL API, you define relationships in the schema, if there are any.

For example, there is a relationship between `users` and `todos` in the todo application. Each user can have multiple todos, but a todo can only belong to a user. As a result, you can fetch the users and their todos in one request.

### Fetch Users and Their Todos {#fetch-users-and-their-todos}

This GraphQL query will fetch all the users and their publicly visible todos:

```graphql
 query {
   users {
     name
     todos {
       title
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

### Fetch Online Users and Their Profile Information {#fetch-online-users}

This GraphQL query will fetch all the currently online users
and their profile information (which is just their name for now):

```graphql
 query {
   online_users {
     last_seen
     user {
       name
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

## Adding Parameters (Arguments) To GraphQL Queries {#adding-parameters}

In most API calls, you usually use parameters. e.g. to specify what data you're fetching.
If you're familiar with making `GET` calls, you would have used a query parameter. For example,
to fetch only 10 todos you might have made this API call: `GET /api/todos?limit=10`.

The GraphQL query analog of this is *arguments*, which are key-value pairs that you can attach to a "field" or "nested object". GraphQL servers come with a default list of arguments, but you can also define custom arguments.

### GraphQL Query With an Argument: Fetch 10 Todos {#basic-argument}

This GraphQL query will fetch only 10 todos rather than all of them.

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

The most important bit to check here is `limit: 10`. GraphQL servers will provide a list of arguments that can be used in `()` next to specific fields.

In our case, we are using Hasura for creating the GraphQL backend which provides filter, sort and pagination arguments.
The GraphQL server or API that you use, might provide a different set of arguments that can be used.

### GraphQL Query With Multiple Arguments {#multiple-arguments}

GraphQL allows you to use multiple arguments in the same query. You can use one or more arguments on each field or nested object in the query.

Let's fetch 1 user and the 5 most recent todos for that user to showcase that.

```graphql
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
```

Notice that we are passing arguments to different fields. The above GraphQL query reads as:
> Fetch users (with limit 1), and their todos (ordered by descending creation time, and limited to 5).

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

## GraphQL Variables: Passing Arguments to Your Queries Dynamically {#graphql-variables}

Until now, you hardcoded the arguments in the queries. In real-life applications, though, the arguments might come from different parts of your application, such as filters for example. So you will pass them dynamically to your queries.

In GraphQL, you can pass arguments dynamically with the help of variables.

## GraphQL Query With Variables {#graphql-query-variables}

Let's fetch a limited number of todos. That can be done with the `limit` argument as follows:

```graphql
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
```

If you look at the previous GraphQL queries with arguments, you might spot two differences:

* You define the type of the variable accepted by the query - an integer (number), in this case
* The hardcoded value is replaced by the variable `$limit`

But before you can run the query, there is an additional step. You also need to send a variables object:

```json
{
   "limit": 10
}
```

The GraphQL server will automatically use the variable in the right place in the query! That means, `$limit` is replaced by the number "10".

Instead of sending just the query to the GraphQL server from our client, we'll send both the query and the variables.

Let's try this out in GraphiQL:
1. Head to GraphiQL
2. Write out this query
3. Scroll to the bottom of the page, where you see a smaller panel "Query Variables"
4. Add the query variable as a JSON object

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

## GraphQL Limit and Offset {#graphql-limit-and-offset}

In GraphQL, you can limit the number of rows returned by the query with the `limit` argument. `limit` takes an integer, representing the number of rows to return.

```graphql
{
  todos(limit: 5) {
    title
    is_completed
    is_public
  }
}
```

In this example, you fetch only 5 todos. 

But why would you want to do that? One of the most common scenarios is pagination, where you would use the `limit` and `offset` arguments. The `offset` argument specifies how many records to skip.

For example, if we have 50 todos, we could split them into 5 pages of 10 todos. You would fetch the first page as follows:

```graphql
{
  todos(limit: 5, offset: 0) {
    title
    is_completed
    is_public
  }
}
```

You would want to skip the first 5 todos on the second page, so the `offset` would be "5".

```graphql
{
  todos(limit: 5, offset: 5) {
    title
    is_completed
    is_public
  }
}
```

You would continue like that until the last page. So, `limit` specifies the number of rows to return, whereas `offset` specifies where to start counting.

## GraphQL Query Filter - Where Clause {#graphql-query-filter}

You can filter the data returned by your queries with the `where` argument. The `where` argument is applied on a specific field and it filters the results based on that field's value.

For example, you can use the `where` argument to fetch all the private todos.

The query is as follows:

```graphql
{
  todos(where: {is_public: {_eq: false}}) {
    title
    is_public
    is_completed
  }
}
```

You can also use the `where` argument multiple times in one query. Let's say you want to see all the public notes from a specific user:

```graphql
{
  users(where: {id: {_eq: "61dd5e7dc4b05c0069a39att"}}) {
    name
    todos(where: {is_public: {_eq: true}}) {
      title
      is_public
    }
  }
}
```

The `where` argument uses operators to filter the results accordingly. The above queries use the `_eq` operator, which stands for "equal to". They read:

> Fetch all the todos where the value of the field `is_public` equals "false".

And

> Fetch all the todos where the value of the field `is_public` equals "true" for the user whose id equals to "61dd5e7dc4b05c0069a39att".

There are other operators that you can see in the [API Reference](https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query.html#whereexp) documentation.
## Summary {#summary}

- You can now write simple and nested GraphQL queries
- You know how to pass arguments to your GraphQL queries
- You know how to make your arguments dynamic by using query variables
- You know how to use the `limit` and `offset` arguments
- You know how to filter your queries with the `where` clause

Next, we'll look at writing data and not just fetching data!
