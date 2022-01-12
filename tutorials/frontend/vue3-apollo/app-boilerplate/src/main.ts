import { createApp, provide, h } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { DefaultApolloClient } from "@vue/apollo-composable"

// @ts-ignore
import App from "./App.vue"
// @ts-ignore
import routes from "~pages"
import { apolloClient } from "./apollo-client"

console.log(routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(router)
app.mount("#app")
