<script>
  import { getContext } from "svelte";
  import { AUTH_CONTEXT_KEY } from "./auth0-variables";
  import { Button } from "sveltestrap";
  const { logout } = getContext(AUTH_CONTEXT_KEY);
</script>

<Button color="primary" on:click={logout}>Log Out</Button>
