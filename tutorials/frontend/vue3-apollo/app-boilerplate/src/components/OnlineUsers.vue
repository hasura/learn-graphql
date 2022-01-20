<script setup lang="ts">
const onlineUsers = [{ user: { name: "someUser1" } }, { user: { name: "someUser2" } }]
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
