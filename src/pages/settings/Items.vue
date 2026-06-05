<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="itemsStore.isLoading" @search="handleSearch" />
      <Button buttonText="新增細項" dialogName="item" />
    </div>
    <ItemListTable
      :items="filteredItems"
      :loading="itemsStore.isLoading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <ItemDialog ref="editDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import ItemListTable from '@/components/settings/item/ItemListTable.vue'
  import ItemDialog from '@/components/settings/item/ItemDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useItemsStore } from '@/stores/modules/items'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const itemsStore = useItemsStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof ItemDialog> | null>(null)
  const searchText = ref('')

  onMounted(() => {
    itemsStore.fetchItems()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredItems = computed(() => {
    if (!searchText.value) return itemsStore.items ?? []
    return itemsStore.items.filter(
      (item) =>
        item.no.includes(searchText.value) ||
        item.item.includes(searchText.value) ||
        (item.period && item.period.includes(searchText.value)) ||
        (item.area && item.area.includes(searchText.value)) ||
        item.category.includes(searchText.value) ||
        item.regulations.some((r) => r.includes(searchText.value)) ||
        item.visitingForms.some((r) => r.includes(searchText.value)),
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
      await itemsStore.removeItem(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
