<script setup lang="ts">
import { inject } from "vue"
import type { AuthService } from "../auth/authService"

const auth = inject("$auth") as AuthService
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light removeMarBottom">
            <div class="navbar-brand navBrand">GraphQL Tutorial App</div>
            <div class="collapse navbar-collapse navBarAlign" id="navbarNav">
                <button @click="auth.logout()" v-if="auth.isAuthenticated()" class="login-btn">
                    Log out
                </button>
            </div>
        </nav>
    </div>
</template>
