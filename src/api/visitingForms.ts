import axios from '@/plugins/axios'

const resource = '/visitingForms'

//取得訪視表清單
export const getVisitingForms = () => axios.get(resource)

//取得一筆訪視表
export const getVisitingFormsById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆訪視表
export const createVisitingForm = (data: object) => axios.post(resource, data)

//修改一筆訪視表
export const updateVisitingForm = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一筆訪視表
export const deleteVisitingForm = (id: string) =>
  axios.delete(`${resource}/${id}`)
