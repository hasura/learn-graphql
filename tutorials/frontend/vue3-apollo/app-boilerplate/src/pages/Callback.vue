<script setup lang="ts">
import { inject } from "vue"
import type { AuthService } from "../auth/authService"

const auth = inject("$auth") as AuthService

function handleLoginEvent(data) {
    window.location.href = data.state.target || "/"
}

// On created:
auth.handleAuthentication()
</script>

<template>
    <div class="spinner">
        <img src="../assets/loading.svg" alt="Loading" />
    </div>
</template>

<style scoped>
.spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
