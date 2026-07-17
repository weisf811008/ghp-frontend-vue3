<template>
  <div class="login-wrapper">
    <img src="/src/assets/logo.png" alt="" />
    <div class="text-h5 text-high-emphasis text-center mb-6">食安管理系統</div>

    <v-card width="448" class="pa-12 pb-8" elevation="3" rounded="lg">
      <v-form fast-fail @submit.prevent="handleLogin">
        <div class="text-body-1 text-medium-emphasis mb-1">帳號</div>
        <v-text-field
          v-model="loginData.username"
          density="compact"
          placeholder="請輸入帳號"
          prepend-inner-icon="mdi-account-circle"
          :rules="usernameRules"
          variant="outlined"
        />

        <div class="text-body-1 text-medium-emphasis mb-1">密碼</div>
        <v-text-field
          v-model="loginData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          density="compact"
          placeholder="請輸入密碼"
          prepend-inner-icon="mdi-lock"
          :rules="passwordRules"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-btn
          block
          class="mt-2"
          color="primary"
          :loading="isLoggingIn"
          size="large"
          type="submit"
          variant="tonal"
        >
          登入
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  import { useAuthStore } from '@/stores/auth.ts'
  import { useSnackbarStore } from '@/stores/snackbar.ts'
  import {useRouter} from 'vue-router'

  const authStore = useAuthStore()
  const snackbarStore = useSnackbarStore()
  const router = useRouter()
  const visible = ref(false)
  const isLoggingIn = ref(false)

  const loginData = reactive({
    username: '',
    password: '',
  })

  const usernameRules = [(value) => !!value || '帳號為必填欄位']

  const passwordRules = [(value) => !!value || '密碼為必填欄位']

  async function handleLogin() {
  if (!loginData.username || !loginData.password) return
  try {
    isLoggingIn.value = true
    await authStore.login(loginData.username, loginData.password)
    snackbarStore.showMessage('登入成功')
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('登入失敗', error)
      const errorMsg =
        error.response?.data.message || '登入失敗，請檢查帳號密碼'

      snackbarStore.showMessage(errorMsg, 'error')
  } finally {
    isLoggingIn.value = false
  }
}

</script>

<style lang="scss" scoped>
  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    height: 100%;
    padding: 24px;
  }
</style>
