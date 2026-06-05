import axios from '@/plugins/axios'

const resource = '/items'

//取得條文清單
export const getItems = () => axios.get(resource)

//取得一筆條文
export const getItemById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆條文
export const createItem = (data: object) => axios.post(resource, data)

//修改一筆條文
export const updateItem = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一筆條文
export const deleteItem = (id: string) =>
  axios.delete(`${resource}/${id}`)
