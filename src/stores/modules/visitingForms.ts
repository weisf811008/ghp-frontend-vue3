import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getVisitingForms,
  getVisitingFormsById,
  createVisitingForm,
  updateVisitingForm,
  deleteVisitingForm,
} from '@/api/visitingForms'

interface VisitingForm {
  id: number
  code: string
  class: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useVisitingFormsStore = defineStore('visitingForms', () => {
  const visitingForms = ref<VisitingForm[]>([])
  const visitingForm = ref<VisitingForm | null>(null)
  const isLoading = ref(false)

  const fetchVisitingForms = async () => {
    try {
      isLoading.value = true
      const res = await getVisitingForms()
      const rawData = res.data ?? []
      const sortData = [...rawData].sort((a, b) => {
        return String(a.code).localeCompare(String(b.code), undefined, {
          numeric: true,
        })
      })
      visitingForms.value = sortData
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchVisitingFormById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getVisitingFormsById(id)
      visitingForm.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addVisitingForm = async (data: Partial<VisitingForm>) => {
    try {
      isLoading.value = true
      await createVisitingForm(data)
      await fetchVisitingForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editVisitingForm = async (id: string, data: Partial<VisitingForm>) => {
    try {
      isLoading.value = true
      await updateVisitingForm(id, data)
      await fetchVisitingForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeVisitingForm = async (id: string) => {
    try {
      isLoading.value = true
      await deleteVisitingForm(id)
      await fetchVisitingForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    visitingForm,
    visitingForms,
    isLoading,
    fetchVisitingForms,
    fetchVisitingFormById,
    addVisitingForm,
    editVisitingForm,
    removeVisitingForm,
  }
})
