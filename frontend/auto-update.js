import Vue from 'vue'

import App from ':au/App.vue'

new Vue({
  render: handle => handle(App)
}).$mount('#body')
