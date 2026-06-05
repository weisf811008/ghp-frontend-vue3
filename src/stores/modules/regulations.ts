import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getRegulations,
  getRegulationById,
  createRegulation,
  updateRegulation,
  deleteRegulation,
} from '@/api/regulations'

interface Regulation {
  id: number
  code: string
  class: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useRegulationsStore = defineStore('regulations', () => {
  const regulations = ref<Regulation[]>([])
  const regulation = ref<Regulation | null>(null)
  const isLoading = ref(false)

  const fetchRegulations = async () => {
    try {
      isLoading.value = true
      const res = await getRegulations()
      const rawData = res.data ?? []
      const sortData = [...rawData].sort((a, b) => {
        return String(a.code).localeCompare(String(b.code), undefined, {numeric: true})
      })
      regulations.value = sortData
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchRegulationById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getRegulationById(id)
      regulation.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addRegulation = async (data: Partial<Regulation>) => {
    try {
      isLoading.value = true
      await createRegulation(data)
      await fetchRegulations()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editRegulation = async (id: string, data: Partial<Regulation>) => {
    try {
      isLoading.value = true
      await updateRegulation(id, data)
      await fetchRegulations()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeRegulation = async (id: string) => {
    try {
      isLoading.value = true
      await deleteRegulation(id)
      await fetchRegulations()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    regulation,
    regulations,
    isLoading,
    fetchRegulations,
    fetchRegulationById,
    addRegulation,
    editRegulation,
    removeRegulation,
  }
})
