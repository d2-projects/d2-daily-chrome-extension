import axios from 'axios'

export default axios.create({
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
