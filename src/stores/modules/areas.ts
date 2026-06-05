import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAreas } from '@/api/areas'

export const useAreasStore = defineStore('areas', () => {
  const areas = ref<string[]>([])
  const isLoading = ref(false)

  const fetchAreas = async () => {
    try {
      isLoading.value = true
      const res = await getAreas()
      areas.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    areas,
    isLoading, 
    fetchAreas
  }
})
