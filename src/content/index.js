/* eslint-disable */

import {
  Message
} from 'element-ui'

import './tools/insert-element-icons'

chrome.extension.onMessage.addListener(
  async function (request, sender, sendMessage) {
    console.log('request.action', request.action)
    console.log('request.category', request.category)
    Message.success(`${request.action} ${request.category}`)
  }
)

console.log('Hello')
