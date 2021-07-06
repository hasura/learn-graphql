<script>
  import Header from "./Header.svelte";
  import OnlineUsersWrapper from "./OnlineUsers/OnlineUsersWrapper.svelte";
  import TodoPrivateWrapper from "./Todo/TodoPrivateWrapper.svelte";
  import TodoPublicWrapper from "./Todo/TodoPublicWrapper.svelte";
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
