import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHistories } from '@/api/histories'

export const useHistoriesStore = defineStore('histories', () => {
  const histories = ref<string[]>([])
  const isLoading = ref(false)

  const fetchHistories = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getHistories(start, end)
      histories.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    histories,
    isLoading,
    fetchHistories,
  }
})
