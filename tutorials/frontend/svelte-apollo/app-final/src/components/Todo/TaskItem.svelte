<script>
  export let todo;
</script>

<li>
  <div class="userInfoPublic" title={todo.user.name}>
    @{todo.user.name}
  </div>

  <div class="labelContent">
    <div>{todo.title}</div>
  </div>
</li>
