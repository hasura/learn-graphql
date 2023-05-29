<script>
  import { gql } from "@apollo/client/core";
  import { mutation } from "svelte-apollo";
  import { GET_MY_TODOS } from "./queries";

  export let isPublic = false;
  let todoInput = "";

  const ADD_TODO = gql`
    mutation ($todo: String!, $isPublic: Boolean!) {
      insert_todos(objects: { title: $todo, is_public: $isPublic }) {
        affected_rows
        returning {
          id
          title
          created_at
          is_completed
        }
      }
    }
  `;

  const updateCache = (cache, { data }) => {
    // If this is for the public feed, do nothing
    if (isPublic) {
      return null;
    }

    // Fetch the todos from the cache
    const existingTodos = cache.readQuery({
      query: GET_MY_TODOS,
    });

    // Add the new todo to the cache
    const newTodo = data.insert_todos.returning[0];
    console.log(existingTodos, newTodo);
    cache.writeQuery({
      query: GET_MY_TODOS,
      data: { todos: [newTodo, ...existingTodos.todos] },
    });
  };

  const addTodoMutation = mutation(ADD_TODO);

  async function addTodo() {
    try {
      await addTodoMutation({
        variables: { todo: todoInput, isPublic },
        update: updateCache,
      });
      todoInput = "";
    } catch (error) {
      // TODO
    }
  }
</script>

<form class="formInput" on:submit|preventDefault={addTodo}>
  <input
    class="input"
    placeholder="What needs to be done?"
    bind:value={todoInput}
  />
  <i class="inputMarker fa fa-angle-right" />
</form>
