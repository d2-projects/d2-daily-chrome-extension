import Vue from 'vue'
import AppComponent from './App.vue'

import {
  Card
} from 'element-ui'

Vue.component('app-component', AppComponent)

Vue.use(Card)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: createElement => {
    return createElement(AppComponent)
  }
})
