<template>
  <div>
    <div class="col-xs-12 col-md-12 col-lg-9 col-sm-12 noPadd">
      <div>
        <div class="col-md-6 col-sm-12">
          <div class="wd95 addPaddTopBottom">
            <div class="sectionHeader">Personal todos</div>
            <!-- <TodoPrivateWrapper /> -->
          </div>
        </div>
        <div class="col-xs-12 col-md-6 col-sm-12 grayBgColor todoMainWrapper commonBorRight">
          <div class="wd95 addPaddTopBottom">
            <div class="sectionHeader">Public feed (realtime)</div>
            <!-- <TodoPublicWrapper /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-lg-3 col-md-12 col-sm-12 noPadd">
      <!-- <OnlineUsers /> -->
    </div>
  </div>
</template>

<route>
{
  meta: {
    requiresAuth: false
  }
}
</route>

<script>
import TodoPrivateWrapper from "../components/TodoPrivateWrapper.vue";
import TodoPublicWrapper from "../components/TodoPublicWrapper.vue";
import OnlineUsers from "../components/OnlineUsers.vue";
import { useSubscription } from "@vue/apollo-composable";
import { defineComponent, reactive } from "vue";
import gql from "graphql-tag";

const GET_MY_TODOS = gql`
  subscription getMyTodos {
    todos(
      limit: 10
      where: { is_public: { _eq: true } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }`;

export default defineComponent({
  components: {
    TodoPrivateWrapper, TodoPublicWrapper, OnlineUsers
  },
  setup() {
    const { onResult, loading, error } = useSubscription(GET_MY_TODOS);

    const state = reactive({
      todos: []
    });

    onResult(({ data }) => {
      console.log("data", data);
      state.todos = data?.todos;
    });

    return {
      state
    }
  }
})
</script>
