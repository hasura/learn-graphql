<script>
  import OnlineUser from "./OnlineUser.svelte";
  import { gql } from "@apollo/client";
  import { subscribe } from "svelte-apollo";
  const onlineUsers = subscribe(gql`
    subscription getOnlineUsers {
      online_users(order_by: { user: { name: asc } }) {
        id
        user {
          name
        }
      }
    }
  `);
</script>

{#if $onlineUsers.loading}
  <div>loading ...</div>
{:else if $onlineUsers.data}
  <div class="onlineUsersWrapper">
    <div class="sliderHeader">
      Online users - {$onlineUsers.data.online_users.length}
    </div>
    {#each $onlineUsers.data.online_users as u (u.id)}
      <OnlineUser user={u.user} />
    {/each}
  </div>
{/if}
