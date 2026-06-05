import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  maxRedirects: 5,
  withCredentials: true, //讓 cookie/session 跟著請求
})

export default instance
