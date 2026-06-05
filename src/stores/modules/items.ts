import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '@/api/items'

interface Item {
  id: number
  no: string
  item: string
  period: string
  area: string
  needCheckValue: boolean
  needDaily: boolean
  categoryId: number
  category: string
  regulations: Array<string>
  visitingForms: Array<string>
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useItemsStore = defineStore('items', () => {
  const items = ref<Item[]>([])
  const item = ref<Item | null>(null)
  const isLoading = ref(false)

  const fetchItems = async () => {
    try {
      isLoading.value = true
      const res = await getItems()
      if (res.data) {
        items.value = res.data.sort(
          (a: Item, b: Item) => String(a.no).localeCompare(String(b.no)),
          undefined,
          {
            numeric: true,
          },
        )
      } else {
        items.value = []
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchItemById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getItemById(id)
      item.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addItem = async (data: Partial<Item>) => {
    try {
      isLoading.value = true
      await createItem(data)
      await fetchItems()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editItem = async (id: string, data: Partial<Item>) => {
    try {
      isLoading.value = true
      await updateItem(id, data)
      await fetchItems()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeItem = async (id: string) => {
    try {
      isLoading.value = true
      await deleteItem(id)
      await fetchItems()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    item,
    items,
    isLoading,
    fetchItems,
    fetchItemById,
    addItem,
    editItem,
    removeItem,
  }
})
