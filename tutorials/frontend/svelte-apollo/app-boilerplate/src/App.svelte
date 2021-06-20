<script>
  import createAuth0Client from "@auth0/auth0-spa-js";
  import { onMount, setContext } from "svelte";
  import {
    AUTH_CONFIG,
    AUTH_CONTEXT_KEY,
  } from "./components/Auth/auth0-variables";
  import Login from "./components/Auth/Login.svelte";
  import TodoApp from "./components/TodoApp.svelte";
  import Callback from "./components/Auth/Callback.svelte";

  let loading = true;
  let isAuthenticated = false;
  let user;
  let idToken;
  let auth0Client;

  const onRedirectCallback = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

  const initAuth0 = async () => {
    auth0Client = await createAuth0Client(AUTH_CONFIG);

    if (window.location.search.includes("code=")) {
      const { appState } = await auth0Client.handleRedirectCallback();
      onRedirectCallback(appState);
    }

    isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      user = await auth0Client.getUser();
      const idTokenClaims = await auth0Client.getIdTokenClaims();
      idToken = idTokenClaims.__raw;
    }

    loading = false;
  };

  setContext(AUTH_CONTEXT_KEY, {
    loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
    logout: (...p) => auth0Client.logout(...p),
  });

  onMount(async () => {
    await initAuth0();
  });
</script>

<!-- <TodoApp /> -->
{#if loading}
  <Callback />
{:else if !isAuthenticated}
  <Login />
{:else}
  <TodoApp />
{/if}
