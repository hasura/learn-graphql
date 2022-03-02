---
title: GraphQL Mutations - Writing data
metaTitle: "GraphQL Mutations to insert data | GraphQL Tutorial"
metaDescription: "Try out GraphQL Mutation using GraphiQL. A GraphQL mutation example with dynamic arguments and variables to insert data"
---

import {Link} from "gatsby";

Before learning about GraphQL Mutations, you should be familiar with the following concepts:
- <Link to="/graphql-queries/#graphiql">GraphiQL</Link>
- <Link to="/graphql-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">Query Variables</Link>

Like GraphQL Queries, Mutations use variables too, so it's important to be familiar with them.

## What is a GraphQL Mutation? {#what-is-a-graphql-mutation}

Up to this point, you only learned how to fetch data in GraphQL. But the real-world applications are complex and you also need to insert, update or delete data. The question is - how do you do it?

In GraphQL, you insert, update or delete data with **mutations**. A Mutation is a GraphQL Operation that allows you to insert new data or modify the existing data on the server-side. You can think of GraphQL Mutations as the equivalent of `POST`, `PUT`, `PATCH` and `DELETE` requests in REST.

To understand better, let’s look at a GraphQL Mutation example:

```graphql
mutation {
  insert_todos(objects: [{ title: "Learn GraphQL" }]) {
    returning {
      id
      created_at
    }
  }
}
```

The above mutation inserts a new todo note into the database. If successful, it returns the `id` and the `creation date` of the newly inserted todo.

What can we observe by looking at the above mutation?
1. It uses the keyword `mutation` rather than `query`.
2. The mutation takes an input. We provide the title of the new todo - `Learn GraphQL`.
3. The mutation returns data. It returns the specified fields for the newly inserted todo.

You will see more GraphQL Mutations later and you will also have the chance to try them in the GraphiQL IDE.

## Types of GraphQL Mutations {#types-of-graphql-mutations}

Mutations in GraphQL can be categorised under the following types:
* Insert Mutations
* Update Mutations
* Delete Mutations

When you run an `update` mutation, you need to specify the record you want to update. Additionally, you need to specify the fields you wish to update and the new data.

When you run a `delete` mutation, you only need to specify the record you want to delete.

In the following section, you can see examples of GraphQL mutations for inserts, updates and deletes.

## GraphQL Mutation Examples {#graphql-mutation-examples}

When you use Hasura to build a GraphQL API, you automatically get the mutations for inserts, updates, and deletes.

Note: The mutations you get from another GraphQL service might be different.

### Create a todo {#create-a-todo}

The first mutation is an `insert` mutation that adds a new todo to the database. The mutation that creates todos is called `insert_todos`.

> **Protip**: If you don’t know the mutation name, GraphiQL comes to the rescue! Head over to GraphiQL and click on the "docs" tab (on the right side). Type "todo" there and you’ll see a list of GraphQL queries and types that use todo. Read through their descriptions and you’ll soon find that `insert_todos` is what you need.

In GraphiQL, write the following mutation:

```graphql
mutation {
  insert_todos(objects: [{ title: "Learn about GraphQL Mutations" }]) {
    returning {
      id
    }
  }
}
```

The todo data we want to insert is sent as an argument to the `insert_todos` mutation.

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

### Returning data after the mutation {#returning-data-after-the-mutation}
Since the mutation also returns data, we must specify the fields we want to get back after the mutation finishes. The "fields" of the mutation specify the shape of the _response_ that we want the server to send back.

Let's say we would like to get the entire todo object once it's been created. It can be done as follows:

```graphql
mutation {
  insert_todos(objects: [{ title: "New Todo" }]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

Let's analyze the response returned by this mutation!

### Mutation Response {#mutation-response}

Running the above mutation returns the following response:

```graphql
{
  "data": {
    "insert_todos": {
      "returning": [
        {
          "id": 55386,
          "title": "New Todo",
          "is_completed": false,
          "is_public": false,
          "created_at": "2022-02-24T10:26:30.718681+00:00"
        }
      ]
    }
  }
}
```

The mutation returns all the todo data we requested; nothing more, nothing less.

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

### GraphQL Variables: Pass Arguments to Mutations Dynamically {#graphql-variables-pass-arguments-to-mutations-dynamically}

In real-world applications, you will most likely parameterize the arguments of the mutations. There are not many scenarios where you would hardcode the mutations in the application.

The reason for using variables is that the arguments for mutations come from different parts of the application. For instance, the arguments might come from a drop-down menu after selecting an option. If you would hardcode the mutation, you would have duplicate code in your application. By parameterizing the mutation, you can re-use it with different arguments.

Let's refactor the `insert_todos` mutation to use Query Variables:

```graphql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

Looking at the above mutation, you can observe that we are not passing the todo title directly anymore. Instead, we'll pass the todo title as a variable.

```javascript
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

Here the `todos_insert_input` is the type of the variable `$todo` and `!` is used to denote that it is a mandatory input.

### Update a todo {#update-a-todo}

We can also use Query Variables when using an "update" mutation. The mutation used to update todos is called `update_todos`.

```graphql
mutation ($id: Int, $is_completed: Boolean, $title: String) {
  update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $is_completed, title: $title}) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
```

Instead of hardcoding the _id_, *is_completed* and _title_ directly into the mutation, we pass them as variables. 

This way, you can re-use the mutation and update other todos without modifying it. All you need to do is to update the Query Variables.

```graphql
{
  "id": 55414,
  "is_completed": true,
  "title": "Updated - New Todo"
}
```

Running the mutation will return the following response:

```graphql
{
  "data": {
    "update_todos": {
      "affected_rows": 1,
      "returning": [
        {
          "id": 55414,
          "title": "Updated - New Todo",
          "is_completed": true
        }
      ]
    }
  }
}
```

The response illustrates the updated todo. Of course, you can tweak the mutation to return something else. For example, you can only leave `affected_rows` and remove the rest.

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

### Delete a todo {#delete-a-todo}

Let's try to delete a note from the database. You can do that with the help of the `delete_todos` mutation.

```graphql
mutation($id: Int) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      id
      title
    }
  }
}
```

We pass the id as a variable.

```javascript
{
  "id": 55386
}
```

After the mutation finishes, you will get the following response:

```javascript
{
  "data": {
    "delete_todos": {
      "affected_rows": 1,
      "returning": [
        {
          "id": 55386,
          "title": "New Todo"
        }
      ]
    }
  }
}
```

The mutation returns the number of affected rows and the todo title.

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

## Nested Mutation

In GraphQL, you can make multiple mutations in one request with the help of nested mutations. When two objects have a relationship between them, you can perform nested mutations.

Let's say we want to add a new todo and its author in the same request. If these objects have a relationship, you can insert both objects - the todo and user - in the same request.

```graphql
mutation insertTodos {
  insert_todos(objects: [{title: "Nested Mutations", user: {data: {name: "Hasura"}}}]) {
    affected_rows
    returning {
      id
      title
      user {
        id
        name
      }
    }
  }
}
```

If any of the mutations fails, no data is inserted into the database. Both mutations need to be successful for the data to be added to the database.

Note: The way the todo application is set up does not allow us to run the above mutation. The user exists before a new todo is added, so the above mutation is just for illustrative purposes.

## Bulk Mutation

If you want to add or delete multiple todos in one go, you can do that with bulk mutations. The GraphQL Mutation below illustrates an example of a bulk insert mutation.

```graphql
mutation {
  insert_todos(
    objects: [
      { title: "Learn about GraphQL Mutations" }, 
      { title: "Learn about Bulk Mutations" }
    ]
  ) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
```

Instead of adding the todos with two separate operations, you added them simultaneously.

How do you achieve the same thing with Query Variables? You can accomplish the same thing as follows: 

```graphql
mutation($todos: [todos_insert_input!]!) {
  insert_todos(objects: $todos) {
    affected_rows
    returning {
      id
      title
      is_completed
    }
  }
}
```

Now you need to pass the todos as an array.

```graphql
{
  "todos": [
    { "title": "Bulk Mutation" },
    { "title": "GraphQL Variables" }
  ]
}
```

The mutation response illustrates the number of rows affected and the newly inserted notes.

```graphql
{
  "data": {
    "insert_todos": {
      "affected_rows": 2,
      "returning": [
        {
          "id": 59491,
          "title": "Bulk Mutation",
          "is_completed": false
        },
        {
          "id": 59492,
          "title": "GraphQL Variables",
          "is_completed": false
        }
      ]
    }
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Try it out in GraphiQL</a></b>

That's how you can perform bulk mutations in GraphQL!

## GraphQL Mutation Best Practices {#graphql-mutation-best-practices}

1\. Start with a verb when you name your mutations. Looking at the todo application, you can see that each mutation starts with a verb - `insert_todos`, `update_todos` and `delete_todos`. The verb describes what the mutation does.

2\. Keep your mutations specific. Each mutation should serve only one purpose. For instance, a mutation should not allow you to insert and update a todo note.

3\. Mutations should use a single input object as an argument. As you might have observed earlier, the `insert_todos` mutation takes the `todos_insert_input!` input object as an argument.

## Summary {#summary}

In this section, you learned:
- What a GraphQL Mutation is
- About the available types of mutations
- How to write mutations for inserting, updating and deleting data
- How to pass dynamic arguments/data to mutations with query variables
- How to perform nested and bulk mutations
- About GraphQL Mutation best practices

Next, let’s look at GraphQL Subscriptions.
