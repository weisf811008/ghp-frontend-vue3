import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/api/categories'

interface Category {
  id: number
  category: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const rategory = ref<Category | null>(null)
  const isLoading = ref(false)

  const fetchCategories = async () => {
    try {
      isLoading.value = true
      const res = await getCategories()
      categories.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCategoryById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getCategoryById(id)
      rategory.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addCategory = async (data: Partial<Category>) => {
    try {
      isLoading.value = true
      await createCategory(data)
      await fetchCategories()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editCategory = async (id: string, data: Partial<Category>) => {
    try {
      isLoading.value = true
      await updateCategory(id, data)
      await fetchCategories()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeCategory = async (id: string) => {
    try {
      isLoading.value = true
      await deleteCategory(id)
      await fetchCategories()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    rategory,
    categories,
    isLoading,
    fetchCategories,
    fetchCategoryById,
    addCategory,
    editCategory,
    removeCategory,
  }
})
