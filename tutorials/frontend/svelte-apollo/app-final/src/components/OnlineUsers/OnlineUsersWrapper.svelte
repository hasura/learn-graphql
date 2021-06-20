<script>
  import OnlineUser from "./OnlineUser.svelte";
  const onlineUsers = [{ name: "someUser1" }, { name: "someUser2" }];
</script>

<div class="onlineUsersWrapper">
  <div class="sliderHeader">Online users - {onlineUsers.length}</div>
  {#each onlineUsers as user}
    <OnlineUser {user} />
  {/each}
</div>
