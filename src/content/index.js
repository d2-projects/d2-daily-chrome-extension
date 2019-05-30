/* eslint-disable */
import Vue from 'vue'
import './utils/insert-element-icons'
import App from './App.vue'
import { Button, Dialog, Form, FormItem, Input, Checkbox } from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)

const AppConstructor = Vue.extend(App)
const instance = new AppConstructor()
instance.$mount();
document.body.appendChild(instance.$el);

chrome.extension.onMessage.addListener(
  async function (request, sender, sendMessage) {
    instance.onMessage(request)
  }
)
