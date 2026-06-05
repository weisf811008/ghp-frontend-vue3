<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="formsStore.isLoading" @search="handleSearch" />
      <Button buttonText="新增巡檢表單" dialogName="form" />
    </div>
    <FormListTable
      :items="filteredForms"
      :loading="formsStore.isLoading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <FormDialog ref="editDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import FormListTable from '@/components/form/FormListTable.vue'
  import FormDialog from '@/components/form/FormDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useFormsStore } from '@/stores/modules/forms'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const formsStore = useFormsStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof FormDialog> | null>(null)
  const searchText = ref('')

  onMounted(() => {
    formsStore.fetchForms()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredForms = computed(() => {
    if (!searchText.value) return formsStore.forms ?? []
    return formsStore.forms.filter(
      (item) =>
        item.title.includes(searchText.value) ||
        item.remarks?.includes(searchText.value) ,
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
      await formsStore.removeForm(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
