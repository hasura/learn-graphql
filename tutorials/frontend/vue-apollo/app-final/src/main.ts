import { createApp, provide, h } from "vue"
import { DefaultApolloClient } from "@vue/apollo-composable"

// @ts-ignore
import App from "./App.vue"
import { apolloClient } from "./apollo-client"
import { router } from "./router"

import authPlugin from "./auth/authPlugin"

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(authPlugin)
app.use(router)
app.mount("#app")
