// 巡檢紀錄
export const inspectionDetailForm = [
  { title: '表單名稱', key: 'title' },
  { title: '巡檢日期', key: 'date', format: 'date' },
  { title: '巡檢人員', key: 'inspectedBy.name' },
  { title: '填報日期', key: 'createdAt', format: 'createdAt' },
]

// 查看巡檢紀錄
export const inspectionDetailHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '檢核大項', key: 'category', width: '150px' },
  { title: '檢核細項', key: 'item' },
  { title: '測量值', key: 'checkValue', width: '80px' },
  { title: '檢核結果', key: 'status', width: '100px'},
]

// 巡檢紀錄填報
export const inspectionFormCheckHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '檢核細項', key: 'item' },
  { title: '測量值', key: 'checkValue', width: '120px' },
  { title: '檢核結果', key: 'status', width: '100px'},
]

export const statusOptions = [
  { label: '合格', value: 'pass', color: 'green' },
  { label: '不合格', value: 'fail', color: 'red' },
  { label: '其他', value: 'others', color: 'orange' },
]