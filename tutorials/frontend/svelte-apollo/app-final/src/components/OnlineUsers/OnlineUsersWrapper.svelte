<script>
  import { onMount, onDestroy } from "svelte";
  import OnlineUser from "./OnlineUser.svelte";
  import { gql } from "@apollo/client/core";
  import { subscribe, mutation } from "svelte-apollo";

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

  let onlineIndicator;

  const UPDATE_LASTSEEN_MUTATION = gql`
    mutation updateLastSeen($now: timestamptz!) {
      update_users(where: {}, _set: { last_seen: $now }) {
        affected_rows
      }
    }
  `;
  const updateLastSeenMutation = mutation(UPDATE_LASTSEEN_MUTATION);

  const updateLastSeen = async () => {
    // Use the apollo client to run a mutation to update the last_seen value
    await updateLastSeenMutation({
      variables: { now: new Date().toISOString() },
    });
  };

  onMount(async () => {
    // Every 20s, run a mutation to tell the backend that you're online
    await updateLastSeen();
    onlineIndicator = setInterval(async () => await updateLastSeen(), 20000);
  });

  onDestroy(() => {
    clearInterval(onlineIndicator);
  });
</script>

{#if $onlineUsers.loading}
  <div>loading ...</div>
{:else if $onlineUsers.error}
  <div>Error!</div>
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
