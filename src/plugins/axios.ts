import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: 'https://localhost:7074/api',
})

// 每次請求自動帶 JWT Token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    import('@/stores/snackbar').then(({ useSnackbarStore }) => {
      const snackbarStore = useSnackbarStore()

      if (err.response) {
        switch (err.response.status) {
          case 400:
            snackbarStore.showMessage(err.response.data.message, 'error')
            break
          case 401:
            snackbarStore.showMessage('請重新登入', 'error')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            if (router.currentRoute.value.name !== 'Login') {
              router.push({ name: 'Login' })
            }
            break
          case 403:
            snackbarStore.showMessage('沒有存取權限', 'error')
            break
          case 409:
            snackbarStore.showMessage(err.response.data.message, 'error')
            break
          case 422:
            snackbarStore.showMessage(
              err.response.data.errors
                ?.map((e: any) => `${e.field}${e.message}`)
                .join('、') ?? '格式錯誤',
              'error',
            )
            break
          default:
            snackbarStore.showMessage('系統發生錯誤，請聯絡系統管理員', 'error')
        }
      } else if (!window.navigator.onLine) {
        snackbarStore.showMessage('網路異常，請重新連線', 'error')
      }
    })

    return Promise.reject(err)
  },
)

export default instance