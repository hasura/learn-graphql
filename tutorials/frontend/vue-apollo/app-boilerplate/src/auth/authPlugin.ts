import authService from "./authService"

export default {
    install: (app, options) => {
        app.config.globalProperties.$auth = authService
        app.provide("$auth", authService)

        app.mixin({
            created() {
                if (this.handleLoginEvent) {
                    authService.addListener("loginEvent", this.handleLoginEvent)
                }
            },
            destroyed() {
                if (this.handleLoginEvent) {
                    authService.removeListener("loginEvent", this.handleLoginEvent)
                }
            },
        })
    },
}
