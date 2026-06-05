<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="regulationsStore.isLoading" @search="handleSearch" />
      <Button buttonText="新增GHP條文" dialogName="regulation" />
    </div>
    <RegulationListTable
      :items="filteredRegulations"
      :loading="regulationsStore.isLoading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <RegulationDialog ref="editDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import RegulationListTable from '@/components/settings/regulation/RegulationListTable.vue'
  import RegulationDialog from '@/components/settings/regulation/RegulationDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useRegulationsStore } from '@/stores/modules/regulations'
  import { useSnackbarStore } from '@/stores/snackbar'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const regulationsStore = useRegulationsStore()
  const snackbarStore = useSnackbarStore()

  const editDialogRef = ref<InstanceType<typeof RegulationDialog> | null>(null)
  const searchText = ref('')

  onMounted(() => {
    regulationsStore.fetchRegulations()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredRegulations = computed(() => {
    if (!searchText.value) return regulationsStore.regulations ?? []
    return regulationsStore.regulations.filter(
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
      await regulationsStore.removeRegulation(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
