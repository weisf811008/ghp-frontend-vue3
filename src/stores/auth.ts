import axios from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

import { loginUser, getUserInfo, logoutUser } from '@/api/auth'

export interface User {
  id: string | number
  username: string
}

export interface LoginCredential {
  username?: string
  password?: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const user = ref<User | null>(null)
  const returnUrl = ref<string | null>(null)

  // 帳號登入
  const login = async (credential: LoginCredential) => {
    try {
      isLoading.value = true
      const res = await loginUser(credential)
      user.value = res.data
      const redirect = returnUrl.value || 'home'
      returnUrl.value = null
      router.push(redirect)
    } finally {
      isLoading.value = false
    }
  }

  // 帳號登出
  const logout = async () => {
    try {
      isLoading.value = true
      await logoutUser()
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  // 取得當前登入使用者資訊
  const getUser = async () => {
    try {
      isLoading.value = true
      const res = await getUserInfo()
      user.value = res.data
    } finally {
      isLoading.value = false
    }
  }

  const setReturnUrl = (url: string) => {
    returnUrl.value = url
  }

  return {
    isLoading,
    user,
    returnUrl,
    login,
    logout,
    getUser,
    setReturnUrl,
  }
})
