import axios from '@/plugins/axios'

const resource = '/categories'

//取得大項清單
export const getCategories = () => axios.get(resource)

//取得一筆大項
export const getCategoryById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆大項
export const createCategory = (data: object) => axios.post(resource, data)

//修改一筆大項
export const updateCategory = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一筆大項
export const deleteCategory = (id: string) =>
  axios.delete(`${resource}/${id}`)
