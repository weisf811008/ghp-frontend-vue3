import axios from '@/plugins/axios'

const resource = '/auth'

//帳號登入
export const loginUser = (data: object) =>
  axios.post(`${resource}/login`, data)

//取得當前使用者資訊
export const getUserInfo = () => axios.get(`${resource}/me`)

//帳號登出
export const logoutUser = () => axios.get(`${resource}/logout`)
