---
title: "Mutation and update cache"
metaTitle: "Apollo client.mutate for GraphQL mutation update | ReScript React Apollo GraphQL Tutorial"
metaDescription: "We will use the Apollo useMutation React hook from @apollo/client as an example to modify existing data and update cache locally using readQuery and writeQuery and handle optimisticResponse"
---

Let's create ToggleTodoMutation query module as shown below.

```reason
module ToggleTodoMutation = %graphql(`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `)
```

Let's integrate ToggleTodoMutation query into TodoItem component.

```reason
@react.component
let make = (~todo: TodosQuery.Inner.t_todos) => {
  let (toggleTodoMutate, _toggleTodoResult) = ToggleTodoMutation.use()



  let toggleTodo = _e => {
    toggleTodoMutate(
      ~update=({readQuery, writeQuery}, {data}) => {

      },
      {
        id: todo.id,
        isCompleted: !todo.is_completed,
      },
    )->ignore
  }

  <li>
    <div className="view">
      <div className="round">
        <input
          checked={todo.is_completed}
          type_="checkbox"
          id={Js.Int.toString(todo.id)}
          onChange={toggleTodo}
        />
        <label htmlFor={Js.Int.toString(todo.id)} />
      </div>
    </div>
    <div className={"labelContent" ++ (todo.is_completed ? " completed" : "")}>
      <div> {todo.title->React.string} </div>
    </div>
    <button className="closeBtn" onClick={removeTodo}> {"x"->React.string} </button>
  </li>
}
```

The above code will just make a mutation, updating the todo's is_completed property in the database.
To update the cache, we will be using the `update` function again to modify the cache. We need to fetch the current list of todos from the cache before modifying it.

Now let's add the code for `update` function.

```reason
let toggleTodo = _e => {
    toggleTodoMutate(
      ~update=({readQuery, writeQuery}, {data}) => {
        let existingTodos = readQuery(~query=module(TodosQuery), ())
        switch existingTodos {
        | Some(todosResult) =>
          switch todosResult {
          | Ok({todos}) => {
              let newTodos = Js.Array2.map(todos, t => {
                if t.id == todo.id {
                  {...t, is_completed: !t.is_completed}
                } else {
                  t
                }
              })
              let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
            }
          | _ => ()
          }
        | None => ()
        }
      },
      {
        id: todo.id,
        isCompleted: !todo.is_completed,
      },
    )->ignore
  }
```

We are fetching the existing todos from the cache using `cache.readQuery` and updating the is_completed value for the todo that has been updated.

Finally we are writing the updated todo list to the cache using `cache.writeQuery`.

This updates the cache, but it does only after receiving response from GraphQL server. This might add noticable delay for UI updates. To avoid this problem we can use `optimisticResponse` feature of Apollo to update cache immediately after sending GraphQL request, so that the user can see UI update immediately.

When we pass `optimisticResponse` argument to mutate function update function is executed twice. It is excuted first time immediately after GraphQL request is sent which optimistic response object as data. It is executed second time after GraphQL response is received.

```reason
  let toggleTodo = _e => {
    toggleTodoMutate(
+      ~optimisticResponse=_variables => {
+        update_todos: Some(
+          (
+            {
+              affected_rows: 1,
+              __typename: "todos_mutation_response",
+            }: ToggleTodoMutation.ToggleTodoMutation_inner.t_update_todos
+          ),
+        ),
+      },
      ~update=({readQuery, writeQuery}, {data: _data}) => {
        let existingTodos = readQuery(~query=module(TodosQuery), ())
        switch existingTodos {
        | Some(todosResult) =>
          switch todosResult {
          | Ok({todos}) => {
              let newTodos = Js.Array2.map(todos, t => {
                if t.id == todo.id {
                  {...t, is_completed: !t.is_completed}
                } else {
                  t
                }
              })
              let _ = writeQuery(~query=module(TodosQuery), ~data={todos: newTodos}, ())
            }
          | _ => ()
          }
        | None => ()
        }
      },
      {
        id: todo.id,
        isCompleted: !todo.is_completed,
      },
    )->ignore
  }
```
