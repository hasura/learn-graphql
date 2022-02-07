<script setup lang="ts">
import { useMutation, useResult, useSubscription } from "@vue/apollo-composable"
import { SUBSCRIPTION_ONLINE_USERS, UPDATE_LASTSEEN_MUTATION } from "../graphql-operations"

const onlineUsersSubscription = useSubscription(SUBSCRIPTION_ONLINE_USERS)
const onlineUsers = useResult(onlineUsersSubscription.result, [], (data) => data.online_users)

const updateLastSeenMutation = useMutation(UPDATE_LASTSEEN_MUTATION, 
    () => ({
        variables: {
            now: new Date().toISOString(),
        },
    })
)

setInterval(async () => {
    try {
        updateLastSeenMutation.mutate()
    } catch (e) {
        console.log(e)
    }
}, 30000)
</script>

<template>
    <div class="sliderMenu grayBgColor">
        <div class="sliderHeader">
            <p>Online users - {{ onlineUsers.length || "" }}</p>
        </div>
        <div class="userInfo" v-for="user in onlineUsers" :key="user.user.name">
            <div class="userImg">
                <i class="far fa-user" />
            </div>
            <div class="userName">
                <p>{{ user.user.name }}</p>
            </div>
        </div>
    </div>
</template>
