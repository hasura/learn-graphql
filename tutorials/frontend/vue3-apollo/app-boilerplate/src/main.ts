// @ts-ignore
import App from "./App.vue"
import { createApp } from "vue"
import { router } from "./router"
import authPlugin from "./auth/authPlugin"

const app = createApp(App)

app.use(authPlugin)
app.use(router)
app.mount("#app")
