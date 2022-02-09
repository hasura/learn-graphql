<script lang="ts" setup>
import TodoInput from "../components/TodoInput.vue"
import TodoPrivateList from "../components/TodoPrivateList.vue"
import TodoPublicList from "../components/TodoPublicList.vue"
import OnlineUsers from "../components/OnlineUsers.vue"
</script>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>

<template>
    <div>
        <div class="col-xs-12 col-md-12 col-lg-9 col-sm-12 noPadd">
            <div>
                <div class="col-md-6 col-sm-12">
                    <div class="wd95 addPaddTopBottom">
                        <div class="sectionHeader">Personal todos</div>
                        <div class="todoWrapper">
                            <TodoInput type="private" />
                            <TodoPrivateList type="private" />
                        </div>
                    </div>
                </div>
                <div
                    class="col-xs-12 col-md-6 col-sm-12 grayBgColor todoMainWrapper commonBorRight"
                >
                    <div class="wd95 addPaddTopBottom">
                        <div class="sectionHeader">Public feed (realtime)</div>
                        <div class="todoWrapper">
                            <TodoInput type="public" />
                            <TodoPublicList type="public" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-lg-3 col-md-12 col-sm-12 noPadd">
            <OnlineUsers />
        </div>
    </div>
</template>
