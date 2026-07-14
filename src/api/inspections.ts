import axios from '@/plugins/axios'

const resource = '/inspections'

//取得巡檢紀錄清單
export const getInspections = () => axios.get(resource)

//取得一筆巡檢紀錄
export const getInspectionById = (id: string) => axios.get(`${resource}/${id}`)

//新增一筆巡檢紀錄
export const createInspection = (data: object) => axios.post(resource, data)

//上傳一個檔案
export const uploadInspection = (data: object) =>
  axios.post(`${resource}/files`, data)

//取得一個已上傳的檔案
const getFileByFilename = (filename: string) => {
  window.open(`https://localhost:7074/api/${resource}/files/${filename}`)
}