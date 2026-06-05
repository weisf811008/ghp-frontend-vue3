<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="categoriesStore.isLoading" @search="handleSearch" />
      <Button buttonText="新增大項" dialogName="category" />
    </div>
    <CategoryListTable
      :items="filteredCategories"
      :loading="categoriesStore.isLoading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <CategoryDialog ref="editDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import CategoryListTable from '@/components/settings/category/CategoryListTable.vue'
  import CategoryDialog from '@/components/settings/category/CategoryDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useCategoriesStore } from '@/stores/modules/categories'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const categoriesStore = useCategoriesStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof CategoryDialog> | null>(null)
  const searchText = ref('')

  onMounted(() => {
    categoriesStore.fetchCategories()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredCategories = computed(() => {
    if (!searchText.value) return categoriesStore.categories ?? []
    return categoriesStore.categories.filter((item) =>
      item.category.includes(searchText.value),
    )
  })

  const handleEdit = (item: object) => {
    editDialogRef.value?.open(item)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDialogRef.value?.open({
      message: '確定要刪除嗎?',
      confirmText: '刪除',
    })

    if (!confirmed) return

    try {
      await categoriesStore.removeCategory(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
