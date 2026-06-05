import axios from '@/plugins/axios'

const resource = '/regulations'

//取得條文清單
export const getRegulations = () => axios.get(resource)

//取得一筆條文
export const getRegulationById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆條文
export const createRegulation = (data: object) => axios.post(resource, data)

//修改一筆條文
export const updateRegulation = (id: string, data: object) =>
  axios.put(`${resource}/${id}`, data)

//刪除一筆條文
export const deleteRegulation = (id: string) =>
  axios.delete(`${resource}/${id}`)
