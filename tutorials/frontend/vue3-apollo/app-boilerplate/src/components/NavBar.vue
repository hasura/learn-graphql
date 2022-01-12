<script setup lang="ts">
import { ref } from "vue"

function logout() {}
const isAuthenticated = ref(false)
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light removeMarBottom">
            <div class="navbar-brand navBrand">GraphQL Tutorial App</div>
            <div class="collapse navbar-collapse navBarAlign" id="navbarNav">
                <button v-on:click="logout" v-if="isAuthenticated" class="login-btn">
                    Log out
                </button>
            </div>
        </nav>
    </div>
</template>
