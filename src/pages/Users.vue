<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="UsersStore.isLoading" @search="handleSearch" />
      <Button buttonText="新增帳號" dialogName="user" />
    </div>
    <UserListTable
      :items="filteredUsers"
      :loading="UsersStore.isLoading"
      @edit="handleEdit"
      @editPassword="handleEditPassword"
      @delete="handleDelete"
    />
    <UserDialog ref="editDialogRef" />
    <UserEditPasswordDialog ref="editPasswordDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import UserListTable from '@/components/user/UserListTable.vue'
  import UserDialog from '@/components/user/UserDialog.vue'
  import UserEditPasswordDialog from '@/components/user/UserEditPasswordDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useUsersStore } from '@/stores/modules/Users'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const UsersStore = useUsersStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof UserDialog> | null>(null)
  const editPasswordDialogRef = ref<InstanceType<typeof UserEditPasswordDialog> | null>(null)
  const searchText = ref('')

  onMounted(() => {
    UsersStore.fetchUsers()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredUsers = computed(() => {
    if (!searchText.value) return UsersStore.Users ?? []
    return UsersStore.Users.filter(
      (item) =>
        item.roles?.[0]?.role?.includes(searchText.value) ||
        item.username.includes(searchText.value) ||
        item.name.includes(searchText.value) ||
        item.phone.includes(searchText.value) ||
        item.email.includes(searchText.value),
    )
  })

  const handleEdit = (item: object) => {
    editDialogRef.value?.open(item)
  }

  const handleEditPassword = (item: object) => {
    editPasswordDialogRef.value?.open(item)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDialogRef.value?.open({
      message: '確定要刪除嗎?',
      confirmText: '刪除',
    })

    if (!confirmed) return

    try {
      await UsersStore.removeUser(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
