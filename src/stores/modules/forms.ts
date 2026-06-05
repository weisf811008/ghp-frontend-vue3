import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
} from '@/api/forms'

interface Form {
  id: number
  title: string
  remarks: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  details?: [{}]
}

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<Form[]>([])
  const form = ref<Form | null>(null)
  const isLoading = ref(false)

  const fetchForms = async () => {
    try {
      isLoading.value = true
      const res = await getForms()
      forms.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchFormById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getFormById(id)
      form.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addForm = async (data: Partial<Form>) => {
    try {
      isLoading.value = true
      await createForm(data)
      await fetchForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editForm = async (id: string, data: Partial<Form>) => {
    try {
      isLoading.value = true
      await updateForm(id, data)
      await fetchForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeForm = async (id: string) => {
    try {
      isLoading.value = true
      await deleteForm(id)
      await fetchForms()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    forms,
    isLoading,
    fetchForms,
    fetchFormById,
    addForm,
    editForm,
    removeForm,
  }
})
