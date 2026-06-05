import axios from '@/plugins/axios'

const resource = '/forms'

//取得表單清單
export const getForms = () => axios.get(resource)

//取得一筆表單
export const getFormById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆表單
export const createForm = (data: object) => axios.post(resource, data)

//修改一筆表單
export const updateForm = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一筆表單
export const deleteForm = (id: string) =>
  axios.delete(`${resource}/${id}`)
