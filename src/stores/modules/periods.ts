import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPeriods } from '@/api/periods'

export const usePeriodsStore = defineStore('periods', () => {
  const periods = ref<string[]>([])
  const isLoading = ref(false)

  const fetchPeriods = async () => {
    try {
      isLoading.value = true
      const res = await getPeriods()
      periods.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    periods,
    isLoading, 
    fetchPeriods
  }
})
