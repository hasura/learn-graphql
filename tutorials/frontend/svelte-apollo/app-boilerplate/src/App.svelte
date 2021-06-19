<script>
  import Header from "./components/Header.svelte";
  import OnlineUsersWrapper from "./components/OnlineUsers/OnlineUsersWrapper.svelte";
  import TodoPrivateWrapper from "./components/Todo/TodoPrivateWrapper.svelte";
  import TodoPublicWrapper from "./components/Todo/TodoPublicWrapper.svelte";
</script>

<div>
  <Header />
  <div class="row container-fluid p-left-right-0 m-left-right-0">
    <div class="row col-md-9 p-left-right-0 m-left-right-0">
      <div class="col-md-6 sliderMenu p-30">
        <TodoPrivateWrapper />
      </div>
      <div class="col-md-6 sliderMenu p-30 bg-gray border-right">
        <TodoPublicWrapper />
      </div>
    </div>
    <div class="col-md-3 p-left-right-0">
      <div class="col-md-12 sliderMenu p-30 bg-gray">
        <OnlineUsersWrapper />
      </div>
    </div>
  </div>
</div>
