<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search
        :isLoading="visitingFormsStore.isLoading"
        @search="handleSearch"
      />
      <Button buttonText="新增訪視表條文" dialogName="visitingForm" />
    </div>
    <visitingFormListTable
      :items="filterVisitingForms"
      :loading="visitingFormsStore.isLoading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <VisitingFormDialog ref="editDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import visitingFormListTable from '@/components/settings/visitingForm/visitingFormListTable.vue'
  import VisitingFormDialog from '@/components/settings/visitingForm/VisitingFormDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useVisitingFormsStore } from '@/stores/modules/visitingForms'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const visitingFormsStore = useVisitingFormsStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof VisitingFormDialog> | null>(
    null,
  )
  const searchText = ref('')

  onMounted(() => {
    visitingFormsStore.fetchVisitingForms()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filterVisitingForms = computed(() => {
    if (!searchText.value) return visitingFormsStore.visitingForms ?? []
    return visitingFormsStore.visitingForms.filter(
      (item) =>
        item.class.includes(searchText.value) ||
        item.code.includes(searchText.value) ||
        item.description.includes(searchText.value),
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
      await visitingFormsStore.removeVisitingForm(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
