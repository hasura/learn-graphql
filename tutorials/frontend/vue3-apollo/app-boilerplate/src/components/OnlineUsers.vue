<template>
    <div class="sliderMenu grayBgColor">
        <div class="sliderHeader">Online users - {{ onlineUsers.length || "" }}</div>
        <div class="userInfo" v-for="user in onlineUsers" :key="user.user.name">
            <div class="userImg">
                <i class="far fa-user" />
            </div>
            <div class="userName">
                {{ user.user.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMutation, useResult, useSubscription } from "@vue/apollo-composable"
import { SUBSCRIPTION_ONLINE_USERS, UPDATE_LASTSEEN_MUTATION } from "../graphql-operations"

const onlineUsersSubscription = useSubscription(SUBSCRIPTION_ONLINE_USERS)
const onlineUsers = useResult(onlineUsersSubscription.result, [], (data) => data.online_users)

const updateLastSeenMutation = useMutation(UPDATE_LASTSEEN_MUTATION, {
    variables: () => ({
        now: new Date().toISOString(),
    }),
})

setInterval(async () => {
    try {
        updateLastSeenMutation.mutate()
    } catch (e) {
        console.log(e)
    }
}, 30000)
</script>
