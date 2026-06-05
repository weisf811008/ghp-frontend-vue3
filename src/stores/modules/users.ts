import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
} from '@/api/users'

interface User {
  id: number
  username: string
  email: string
  name: string
  phone: string
  needToChangePassword: boolean
  reserved: boolean
  schoolId: number
  roles: {
    role: string
    reserved: boolean
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useUsersStore = defineStore('Users', () => {
  const Users = ref<User[]>([])
  const User = ref<User | null>(null)
  const isLoading = ref(false)

  const fetchUsers = async () => {
    try {
      isLoading.value = true
      const res = await getUsers()
      console.log('res.data', res.data)
      Users.value = res.data ?? []
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserById = async (id: string) => {
    try {
      isLoading.value = true
      const res = await getUserById(id)
      User.value = res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const addUser = async (data: Partial<User>) => {
    try {
      isLoading.value = true
      await createUser(data)
      await fetchUsers()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editUser = async (id: string, data: Partial<User>) => {
    try {
      isLoading.value = true
      await updateUser(id, data)
      await fetchUsers()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const removeUser = async (id: string) => {
    try {
      isLoading.value = true
      await deleteUser(id)
      await fetchUsers()
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  const editUserPassword = async (id: string, data: object) => {
    try {
      isLoading.value = true
      await resetUserPassword(id, data)
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    User,
    Users,
    isLoading,
    fetchUsers,
    fetchUserById,
    addUser,
    editUser,
    removeUser,
    editUserPassword,
  }
})
