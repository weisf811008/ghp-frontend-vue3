import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getDaily,
  getGHP,
  getVisiting,
  getProdTemp,
  getTNH,
  getTableware,
} from '@/api/reports'

export const useReportsStore = defineStore('reports', () => {
  const isLoading = ref(false)
  const dailies = ref<{ rows: any[]; abnormalRows: any[] }>({
    rows: [],
    abnormalRows: [],
  })
  const ghps = ref([])
  const visitings = ref([])
  const prodTemps = ref<{ rows: any[]; abnormalRows: any[] }>({ rows: [], abnormalRows: [] })
  const tnhs = ref<{ rows: any[]; abnormalRows: any[] }>({ rows: [], abnormalRows: [] })
  const tablewares = ref<{ rows: any[]; abnormalRows: any[] }>({ rows: [], abnormalRows: [] })

  const fetchDaily = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getDaily(start, end)
      dailies.value = res.data ?? { rows: [], abnormalRows: [] }
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchGHPs = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getGHP(start, end)
      ghps.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchVisitings = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getVisiting(start, end)
      visitings.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProdTemps = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getProdTemp(start, end)
      prodTemps.value = res.data ?? { rows: [], abnormalRows: [] }
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchTNHs = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getTNH(start, end)
      tnhs.value = res.data ?? {}
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchTablewares = async (start: string, end: string) => {
    try {
      isLoading.value = true
      const res = await getTableware(start, end)
      tablewares.value = res.data ?? {}
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    dailies,
    ghps,
    visitings,
    prodTemps,
    tnhs,
    tablewares,
    fetchDaily,
    fetchGHPs,
    fetchVisitings,
    fetchProdTemps,
    fetchTNHs,
    fetchTablewares,
  }
})
