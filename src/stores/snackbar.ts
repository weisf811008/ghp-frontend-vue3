import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const isVisible = ref(false)
  const text = ref('')
  const color = ref('')
  const timeout = ref(3000)

  // 顯示訊息
  const showMessage = (msg: string, msgColor = 'success', duration = 3000) => {
    text.value = msg
    color.value = msgColor
    timeout.value = duration
    isVisible.value = true
  }

  // 關閉訊息
  const closeMessage = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    text,
    color,
    timeout,
    showMessage,
    closeMessage,
  }
})
