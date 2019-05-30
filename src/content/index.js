/* eslint-disable */
import Vue from 'vue'
import './tools/insert-element-icons'
import App from './App/App.vue'

const AppConstructor = Vue.extend(App)
const instance = new AppConstructor()
instance.$mount();
document.body.appendChild(instance.$el);

chrome.extension.onMessage.addListener(
  async function (request, sender, sendMessage) {
    console.log('request.action', request.action)
    console.log('request.category', request.category)
  }
)
