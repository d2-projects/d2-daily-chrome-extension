import axios from 'axios'
import Swal from 'sweetalert2'
import crawler from './crawler'
import { isGithub } from './tool'

const service = axios.create({
  baseURL: 'https://hellogithub.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    username: 'd2-awesome',
    password: 'bsXms5RrbOjOT1OdUYS96WKU+AJ4P2o1'
  }
})

// 响应 background 信息
chrome.extension.onMessage.addListener(
  async function(request, sender, sendMessage) {
    // 获取页面信息
    if (request.action == 'getInfo') {
      const data = {
        // 页面信息
        ...crawler(),
        // 类型
        category: request.category,
        // api 需要
        source: 'd2',
        device: 'chrome'
      }

      const { value } = await Swal({
        title: '提交此页面',
        html: `
          <p style="margin: 0; text-align: left; font-size: 14px; font-weight: bold;">
            标题
            ${isGithub() ? '（github 项目还会同时收录到 <a href="https://github.com/521xueweihan/HelloGitHub">HelloGitHub月报</a>）' : ''}
          </p>
          <input id="d2-daily-title" value="${data.title}" class="swal2-input" style="margin: 10px 0;">
          <p style="margin: 0; text-align: left; font-size: 14px; font-weight: bold;">简介</p>
          <textarea id="d2-daily-description" class="swal2-textarea" style="margin: 10px 0;" row="2">${data.description}</textarea>
          <p style="margin: 0; text-align: left; font-size: 14px; font-weight: bold;">
            <input type="checkbox" id="network-low"> 不易访问的网站，需要特殊处理
          </p>
          <p style="margin: 0; text-align: left; font-size: 14px; font-weight: bold;">
            <input type="checkbox" id="is-video"> 视频类型的内容
          </p>
          <br/>
          <p style="margin: 0; text-align: left; font-size: 14px; font-weight: bold;">URL</p>
          <p style="margin: 0; text-align: left; font-size: 14px;">${data.url}</p>`,
        focusConfirm: true,
        preConfirm: () => {
          return {
            title: document.getElementById('d2-daily-title').value,
            description: document.getElementById('d2-daily-description').value,
            vpn: document.getElementById('network-low').checked,
            video: document.getElementById('is-video').checked
          }
        }
      })
      
      if (value.title === '') {
        Swal({
          type: 'error',
          title: '不要留空标题',
          text: '请告诉我们您分享的标题'
        })
        return
      }

      if (value.description === '') {
        Swal({
          type: 'error',
          title: '不要留空描述',
          text: '请附带一些介绍信息给我们'
        })
        return
      }

      console.log(JSON.stringify({
        ...data,
        ...value
      }, null, 2))

      if (value.title !== '' && value.description !== '') {
        service({
          url: '/api/v1/project/recommend/',
          method: 'post',
          data: {
            ...data,
            ...value
          }
        })
          .then(res => {
            Swal({
              type: 'success',
              title: '提交成功',
              text: '谢谢您的分享，更多人会为此受益',
              footer: '<a href="https://awesome.fairyever.com/daily/">日报地址: https://awesome.fairyever.com/daily/</a>',
              timer: 5000
            })
          })
          .catch(err => {
            Swal({
              type: 'error',
              title: '发生了点意外',
              text: err.message,
              footer: '<a href="https://github.com/d2-projects/d2-awesome-daily-submit-chrome-extension/issues">反馈问题</a>',
              timer: 5000
            })
          })
      }
    }
  }
)
