import axios from '@/plugins/axios'

const resource = '/areas'

//取得區域標籤清單
export const getAreas = () => axios.get(resource)