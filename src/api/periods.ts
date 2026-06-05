import axios from '@/plugins/axios'

const resource = '/periods'

//取得週期標籤清單
export const getPeriods = () => axios.get(resource)