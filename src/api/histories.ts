import axios from '@/plugins/axios'

const resource = '/histories'

//取得操作記錄
export const getHistories = (start: string, end: string) =>
  axios.get(resource, { params: { start, end } })
