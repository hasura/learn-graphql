<script>
  import { gql } from "@apollo/client/core";
  import { mutation } from "svelte-apollo";
  import { GET_MY_TODOS } from "./queries";
  export let todo;

  const REMOVE_TODO = gql`
    mutation removeTodo($id: Int!) {
      delete_todos(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;

  const removeTodoMutation = mutation(REMOVE_TODO);

  const removeTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeTodoMutation({
      variables: { id: todo.id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
        const newTodos = existingTodos.todos.filter((t) => t.id !== todo.id);
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos },
        });
      },
    });
  };

  const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `;

  const toggleTodoMutation = mutation(TOGGLE_TODO);

  const toggleTodo = () => {
    toggleTodoMutation({
      variables: { id: todo.id, isCompleted: !todo.is_completed },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS });
        const newTodos = existingTodos.todos.map((t) => {
          if (t.id === todo.id) {
            return { ...t, is_completed: !t.is_completed };
          } else {
            return t;
          }
        });
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos },
        });
      },
    });
  };
</script>

<li>
  <div class="view">
    <div class="round">
      <input
        checked={todo.is_completed}
        type="checkbox"
        id={todo.id}
        on:change={toggleTodo}
      />
      <label for={todo.id} />
    </div>
  </div>

  <div class={"labelContent" + (todo.is_completed ? " completed" : "")}>
    <div>{todo.title}</div>
  </div>

  <button class="closeBtn" on:click={removeTodo}> x </button>
</li>
