// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          meta: { title: '首頁' },
          component: () => import('../pages/Home.vue'),
        },
        {
          path: 'settings',
          children: [
            {
              path: 'regulations',
              name: 'Regulations',
              meta: { title: 'GHP條文管理' },
              component: () => import('../pages/settings/Regulations.vue'),
            },
            {
              path: 'visitingForms',
              name: 'VisitingForms',
              meta: { title: '訪視表條文管理' },
              component: () => import('../pages/settings/VisitingForms.vue'),
            },
            {
              path: 'categories',
              name: 'Categories',
              meta: { title: '檢核大項主檔' },
              component: () => import('../pages/settings/Categories.vue'),
            },
            {
              path: 'items',
              name: 'Items',
              meta: { title: '檢核細項主檔' },
              component: () => import('../pages/settings/Items.vue'),
            },
          ],
        },
        // {
        //   path: 'dashboard',
        //   children: [
        //     {
        //       path: 'abnormalCategories',
        //       name: 'AbnormalCategories',
        //       meta: { title: '檢核大項缺失次數' },
        //       component: () =>
        //         import('../pages/dashboard/AbnormalCategories.vue'),
        //     },
        //     {
        //       path: 'normalCategories',
        //       name: 'NormalCategories',
        //       meta: { title: '檢核大項合格次數' },
        //       component: () =>
        //         import('../pages/dashboard/NormalCategories.vue'),
        //     },
        //     {
        //       path: 'abnormalItems',
        //       name: 'AbnormalItems',
        //       meta: { title: '檢核細項十大缺失' },
        //       component: () => import('../pages/dashboard/AbnormalItems.vue'),
        //     },
        //   ],
        // },
        {
          path: 'reports',
          children: [
            {
              path: 'daily',
              name: 'Daily',
              meta: { title: '每日衛生管理日誌' },
              component: () => import('../pages/reports/Daily.vue'),
            },
            {
              path: 'prodtemp',
              name: 'ProdTemp',
              meta: { title: '成品中心溫度報表' },
              component: () => import('../pages/reports/ProdTemp.vue'),
            },
            {
              path: 'tnh',
              name: 'Tnh',
              meta: { title: '庫房、食材、檢體保存溫濕度報表' },
              component: () => import('../pages/reports/Tnh.vue'),
            },
            {
              path: 'tableware',
              name: 'Tableware',
              meta: { title: '餐具檢驗報表' },
              component: () => import('../pages/reports/Tableware.vue'),
            },
            {
              path: 'ghp',
              name: 'Ghp',
              meta: { title: 'GHP報表' },
              component: () => import('../pages/reports/Ghp.vue'),
            },
            {
              path: 'visiting',
              name: 'Visiting',
              meta: { title: '訪視表報表' },
              component: () => import('../pages/reports/Visiting.vue'),
            },
          ],
        },
        {
          path: 'forms',
          name: 'Forms',
          meta: { title: '巡檢目錄' },
          component: () => import('../pages/Forms.vue'),
        },
        {
          path: 'inspection',
          name: 'Inspection',
          meta: { title: '巡檢紀錄' },
          component: () => import('../pages/Inspection.vue'),
        },
        {
          path: 'users',
          name: 'Users',
          meta: { title: '學校帳號管理' },
          component: () => import('../pages/Users.vue'),
        },
        {
          path: 'admin/histories',
          name: 'AdminHistories',
          meta: { title: '' },
          component: () => import('../pages/AdminHistories.vue'),
        },
        {
          path: 'histories',
          name: 'Histories',
          meta: { title: '操作記錄' },
          component: () => import('../pages/Histories.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: {
            name: 'Home',
          },
        },
      ],
    },
  ],
})

const publics = ['Login']

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const isPublicPage = to.name === 'Login'

  if (!isPublicPage && !authStore.isLoggedIn) {
    return { name: 'Login' }
  } else if (isPublicPage && authStore.isLoggedIn) {
    return { name: 'Home' }
  }
})

export default router
