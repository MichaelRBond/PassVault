import Vue from 'vue'
import PassVault from './PassVault'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { PassVault },
  template: '<PassVault/>'
})
