<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <Search :isLoading="inspectionsStore.isLoading" @search="handleSearch" />
      <Button buttonText="巡檢紀錄填報" dialogName="inspectionFormDialog" />
    </div>
    <InspectionListTable
      :items="filteredInspections"
      :loading="inspectionsStore.isLoading"
      @edit="handleOpen"
      @delete="handleDelete"
    />
    <InspectionDetailDialog ref="openDetailDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import Button from '@/components/global/Button.vue'
  import InspectionListTable from '@/components/inspection/InspectionListTable.vue'
  import InspectionDetailDialog from '@/components/inspection/InspectionDetailDialog.vue'
  import ConfirmDialog from '@/components/global/ConfirmDialog.vue'

  // stores
  import { useInspectionsStore } from '@/stores/modules/inspections'
  import { useSnackbarStore } from '@/stores/snackbar'

  import { formatIsoString } from '@/utils/date'

  const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>(null)

  const inspectionsStore = useInspectionsStore()
  const snackbarStore = useSnackbarStore()

  const openDetailDialogRef = ref<InstanceType<
    typeof InspectionDetailDialog
  > | null>(null)
  const searchText = ref('')

  onMounted(() => {
    inspectionsStore.fetchInspections()
  })

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredInspections = computed(() => {
    if (!searchText.value) return inspectionsStore.inspections ?? []
    return inspectionsStore.inspections.filter(
      (item) =>
        item.title.includes(searchText.value) ||
        formatIsoString(item.date).includes(searchText.value) ||
        formatIsoString(item.createAt).includes(searchText.value),
    )
  })

  const handleOpen = (item: object) => {
    openDetailDialogRef.value?.open(item)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDialogRef.value?.open({
      message: '確定要刪除嗎?',
      confirmText: '刪除',
    })

    if (!confirmed) return

    try {
      await inspectionsStore.removeInspection(id)
      snackbarStore.showMessage('刪除成功', 'success')
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('刪除失敗', 'error')
    }
  }
</script>
