import axios from '@/plugins/axios'

const resource = '/users'

//取得帳號清單
export const getUsers = () => axios.get(resource)

//取得一個帳號
export const getUserById = (id: string) => axios.get(`${resource}/${id}`)

//新增一個帳號
export const createUser = (data: object) => axios.post(resource, data)

//修改一個帳號
export const updateUser = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一個帳號
export const deleteUser = (id: string) =>
  axios.delete(`${resource}/${id}`)

//重設一個帳號的密碼
export const resetUserPassword = (id: string, data: object) =>
  axios.patch(`${resource}/${id}/password`, data)