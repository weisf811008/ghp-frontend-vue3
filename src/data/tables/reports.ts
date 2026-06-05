export const dailyHeaders = [
  {
    title: '項次',
    key: 'index',
    minWidth: '80px',
    width: '80px',
    sortable: false,
  },
  { title: '檢核大項', key: 'category', minWidth: '120px', width: '120px' },
  { title: '編號', key: 'no', minWidth: '80px', width: '80px' },
  { title: '檢核細項', key: 'item', minWidth: '200px', width: '200px' },
]

export const ghpHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '類別序號', key: 'code', width: '80px' },
  { title: '類別', key: 'class', width: '150px' },
  { title: '食品良好衛生規範法規GHP檢查', key: 'description'},
  { title: '合格次數', key: 'pass', width: '80px' },
  { title: '不合格次數', key: 'fail', width: '80px' },
  { title: '其他次數', key: 'others', width: '80px' },
]

export const visitingHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '類別', key: 'class', width: '150px' },
  { title: '編號', key: 'code', width: '80px' },
  { title: '訪視項目', key: 'description' },
  { title: '合格次數', key: 'pass', width: '80px' },
  { title: '不合格次數', key: 'fail', width: '80px' },
  { title: '其他次數', key: 'others', width: '80px' },
]

export const prodTempHeaders = [
  { title: '項次', key: 'index', width: '80px', sortable: false },
  { title: '日期', key: 'date', width: '150px' },
  { title: '成品確實封蓋', key: 'wasCovered', width: '100px' },
  { title: '主食', key: 'starter', width: '80px' },
  { title: '主菜', key: 'mainCourse', width: '80px' },
  { title: '副菜', key: 'sideDish', width: '80px' },
  { title: '青菜', key: 'vegetable', width: '80px' },
]

export const tnhHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '日期', key: 'date', width: '150px' },
  { title: '庫房溫度(°C)', key: 'warehouseTemp'},
  { title: '庫房濕度(%)', key: 'warehouseHum' },
  { title: '食材冰箱冷藏溫度(°C)', key: 'fridgeCold'},
  { title: '食材冰箱冷凍溫度(°C)', key: 'fridgeFreeze'},
  { title: '檢體冰箱冷藏溫度(°C)', key: 'specimenFridge'},
]

export const tablewareHeaders = [
  { title: '項次', key: 'index', width: '80px' },
  { title: '日期', key: 'date', width: '150px' },
  { title: '餐桶外觀', key: 'diningBucketLook'},
  { title: '餐桶澱粉殘留檢驗', key: 'diningBucketStarch' },
  { title: '餐桶脂肪殘留檢驗', key: 'diningBucketFat' },
  { title: '湯桶外觀', key: 'soupBucketLook'},
  { title: '湯桶澱粉殘留檢驗', key: 'soupBucketStarch' },
  { title: '湯桶脂肪殘留檢驗', key: 'soupBucketFat' },
  { title: '餐具外觀', key: 'tablewareLook'},
  { title: '餐具澱粉殘留檢驗', key: 'tablewareStarch' },
  { title: '餐具脂肪殘留檢驗', key: 'tablewareFat' },
]
