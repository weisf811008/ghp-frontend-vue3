<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <DateRangePicker @update:dateRange="handleDateRange" />
      <Search :isLoading="historiesStore.isLoading" @search="handleSearch" />
    </div>
    <HistoryListTable
      :items="filteredHistories"
      :loading="historiesStore.isLoading"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'

  // components
  import Search from '@/components/global/Search.vue'
  import DateRangePicker from '@/components/global/DateRangePicker.vue'
  import HistoryListTable from '@/components/HistoryListTable.vue'

  // stores
  import { useHistoriesStore } from '@/stores/modules/histroies'
  import { formatIsoString } from '@/utils/date'

  const historiesStore = useHistoriesStore()
  const searchText = ref('')

  const handleDateRange = ({
    startUtc,
    endUtc,
  }: {
    startUtc: string
    endUtc: string
  }) => {
    historiesStore.fetchHistories(startUtc, endUtc)
  }

  const handleSearch = (value: string) => {
    searchText.value = value
  }

  const filteredHistories = computed(() => {
    if (!searchText.value) return historiesStore.histories ?? []
    return historiesStore.histories.filter(
      (item) =>
        item.name?.includes(searchText.value) ||
        item.username?.includes(searchText.value) ||
        formatIsoString(item.timestamp)?.includes(searchText.value),
    )
  })
</script>
