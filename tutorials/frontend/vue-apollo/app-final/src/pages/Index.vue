<template>
    <div class="overlay">
        <div class="overlay-content">
            <div class="overlay-heading">Welcome to the GraphQL tutorial app</div>
            <div class="overlay-message">Please login to continue</div>
            <div class="overlay-action">
                <button v-on:click="handleLogin" class="login-btn">Log in</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue"
import { router } from "../router"
import type { AuthService } from "../auth/authService"

const auth = inject("$auth") as AuthService
onMounted(() => {
    if (auth.isAuthenticated()) {
        router.push("/todos")
    }
})

function handleLoginEvent() {
    router.push("/todos")
}

function handleLogin() {
    auth.login()
}
</script>
