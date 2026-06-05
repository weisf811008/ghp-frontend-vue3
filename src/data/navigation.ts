export const navItems = [
  {
    title: '首頁',
    icon: 'mdi-home',
    to: '/home',
  },
  {
    title: '基本檔設定',
    icon: 'mdi-cog',
    children: [
      {
        title: 'GHP條文管理',
        to: '/settings/regulations',
      },
      {
        title: '訪視表條文管理 ',
        to: '/settings/visitingForms',
      },
      {
        title: '檢核大項主檔 ',
        to: '/settings/categories',
      },
      {
        title: '檢核細項主檔 ',
        to: '/settings/items',
      },
    ],
  },
  {
    title: '巡檢目錄',
    icon: 'mdi-text-box',
    to: '/forms',
  },
  {
    title: '巡檢紀錄',
    icon: 'mdi-text-box-check',
    to: '/inspection',
  },
  {
    title: '報表管理',
    icon: 'mdi-text-box-multiple',
    children: [
      {
        title: '每日衛生管理日誌',
        to: '/reports/daily',
      },
      {
        title: '成品中心溫度報表',
        to: '/reports/prodtemp',
      },
      {
        title: '庫房、食材、檢體保存溫濕度報表',
        to: '/reports/tnh',
      },
      {
        title: '餐具檢驗報表',
        to: '/reports/tableware',
      },
      {
        title: 'GHP報表',
        to: '/reports/ghp',
      },
      {
        title: '訪視表報表',
        to: '/reports/visiting',
      },
    ],
  },
  {
    title: '學校帳號管理',
    icon: 'mdi-account-multiple',
    to: '/users',
  },
  {
    title: '操作記錄',
    icon: 'mdi-text-box-search',
    to: '/histories',
  },
]
