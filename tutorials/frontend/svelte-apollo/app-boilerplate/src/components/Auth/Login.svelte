<script>
  import { getContext } from "svelte";
  import { AUTH_CONTEXT_KEY } from "./auth0-variables";
  import { Button } from "sveltestrap";
  const { loginWithRedirect } = getContext(AUTH_CONTEXT_KEY);
</script>

<div class="overlay">
  <div class="overlay-content">
    <div class="overlay-heading">Welcome to the GraphQL tutorial app</div>
    <div class="overlay-message">Please login to continue</div>
    <div class="overlay-action">
      <Button
        id="qsLoginBtn"
        color="primary"
        class="btn-margin loginBtn"
        on:click={() => {
          loginWithRedirect({});
        }}
      >
        Log In
      </Button>
    </div>
  </div>
</div>
