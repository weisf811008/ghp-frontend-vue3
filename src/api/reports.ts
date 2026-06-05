import axios from '@/plugins/axios'

const resource = '/reports'
const makeReportApi = (path: string) => (start: string, end: string) =>
  axios.get(`${resource}/${path}`, { params: { start, end } })

export const getDaily = makeReportApi('daily')
export const getGHP = makeReportApi('ghp')
export const getVisiting = makeReportApi('visiting')
export const getProdTemp = makeReportApi('prodtemp')
export const getTNH = makeReportApi('tnh')
export const getTableware = makeReportApi('tableware')
