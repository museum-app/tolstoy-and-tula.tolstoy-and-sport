import Vue from 'vue'

import Window from ':main/Window.vue'
import router from ':main/script/router'
import store from ':main/script/store'

new Vue({
  router,
  store,
  render: handle => handle(Window)
}).$mount('#body')
