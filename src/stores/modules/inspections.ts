import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getInspections,
  getInspectionById,
  createInspection,
  uploadInspection,
} from '@/api/inspections'

interface Inspection {
  id: number
  date: string
  dueDate: string
  remarks: string
  version: number
  closedAt: string
  parentId: number
  formId: number
  title: string
  inspectedBy: {
    username: string
    name: string
  }
  createdAt: string
}

export const useInspectionsStore = defineStore('inspections', () => {
  const inspections = ref<Inspection[]>([])
  const inspection = ref<Inspection | null>(null)
  const isLoading = ref(false)

  const fetchInspections = async () => {
    try {
      isLoading.value = true
      const res = await getInspections()
      inspections.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchInspectionById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getInspectionById(id)
      inspection.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addInspection = async (data: Partial<Inspection>) => {
    try {
      isLoading.value = true
      await createInspection(data)
      await fetchInspections()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const uploadFileInspection = async (data: object) => {
    try {
      isLoading.value = true
      const res = await uploadInspection(data)
      return res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const getUploadFileByFilename = (filename: string) => {
  window.open(`https://localhost:7074/api/inspections/files/${filename}`)
}

  return {
    inspection,
    inspections,
    isLoading,
    fetchInspections,
    fetchInspectionById,
    addInspection,
    uploadFileInspection,
    getUploadFileByFilename,
  }
})
