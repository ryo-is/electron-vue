import Vue from "vue"
import vuetify from "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import "material-design-icons-iconfont/dist/material-design-icons.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (h: any): any => h(App)
}).$mount("#app")
