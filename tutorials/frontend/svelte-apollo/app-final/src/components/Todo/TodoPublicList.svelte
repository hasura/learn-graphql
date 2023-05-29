<script>
  import { gql } from "@apollo/client/core";
  import { onMount } from "svelte";
  import { query, mutation, getClient } from "svelte-apollo";
  import TaskItem from "./TaskItem.svelte";

  export let latestTodo;
  let previousLatestTodo;
  let client = getClient();
  let olderTodosAvailable = latestTodo ? true : false;
  let newTodosCount = 0;
  let initialVariables;

  function getInitialQueryVariables() {
    return { oldestTodoId: latestTodo ? latestTodo.id + 1 : 0 };
  }

  onMount(() => {
    initialVariables = getInitialQueryVariables();
  });

  $: {
    if (previousLatestTodo && previousLatestTodo.id !== latestTodo.id) {
      newTodosCount += 1;
    }
    previousLatestTodo = latestTodo;
  }

  const GET_OLD_PUBLIC_TODOS = gql`
    query getOldPublicTodos($oldestTodoId: Int!) {
      todos(
        where: { is_public: { _eq: true }, id: { _lt: $oldestTodoId } }
        limit: 7
        order_by: { created_at: desc }
      ) {
        id
        title
        created_at
        user {
          name
        }
      }
    }
  `;

  const todos = query(GET_OLD_PUBLIC_TODOS, {
    variables: getInitialQueryVariables(),
  });

  const loadNew = () => {
    const GET_NEW_PUBLIC_TODOS = gql`
      query getNewPublicTodos($latestVisibleId: Int) {
        todos(
          where: { is_public: { _eq: true }, id: { _gt: $latestVisibleId } }
          order_by: { created_at: desc }
        ) {
          id
          title
          created_at
          user {
            name
          }
        }
      }
    `;
    let numTodos = $todos.data && $todos.data.todos && $todos.data.todos.length;
    let newestTodoId = numTodos
      ? $todos.data.todos[0].id
      : latestTodo
      ? latestTodo.id
      : 0;
    todos.fetchMore({
      query: GET_NEW_PUBLIC_TODOS,
      variables: { latestVisibleId: newestTodoId },
      updateQuery: (previousTodos, { fetchMoreResult: { todos } }) => {
        client.writeQuery({
          query: GET_OLD_PUBLIC_TODOS,
          variables: initialVariables,
          data: { todos: [...todos, ...previousTodos.todos] },
        });
        newTodosCount = 0;
      },
    });
  };

  const loadOlder = () => {
    let numTodos = $todos.data && $todos.data.todos && $todos.data.todos.length;
    let oldestTodoId = numTodos
      ? $todos.data.todos[numTodos - 1].id
      : latestTodo
      ? latestTodo.id + 1
      : 0;
    todos.fetchMore({
      query: GET_OLD_PUBLIC_TODOS,
      variables: { oldestTodoId },
      updateQuery: (previousTodos, { fetchMoreResult: { todos } }) => {
        client.writeQuery({
          query: GET_OLD_PUBLIC_TODOS,
          variables: initialVariables,
          data: { todos: [...previousTodos.todos, ...todos] },
        });
      },
    });
  };
</script>

{#if $todos.loading}
  <div>Loading...</div>
{:else if $todos.error}
  <div>Error!</div>
{:else if $todos.data}
  <div class="todoListWrapper">
    {#if newTodosCount > 0}
      <div class="loadMoreSection" on:click={loadNew}>
        New tasks have arrived! ({newTodosCount.toString()})
      </div>
    {/if}

    <ul>
      {#each $todos.data.todos as todo (todo.id)}
        <TaskItem {todo} />
      {/each}
    </ul>

    <div class="loadMoreSection" on:click={loadOlder}>
      {olderTodosAvailable ? "Load older tasks" : "No more public tasks!"}
    </div>
  </div>
{/if}
