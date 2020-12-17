import Vue from 'vue'

import App from ':main/App.vue'
import store from ':main/script/store'

new Vue({
  store,
  render: handle => handle(App)
}).$mount('#body')
