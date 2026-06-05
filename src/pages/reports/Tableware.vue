<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <DateRangePicker @update:dateRange="handleDateRange" />
    </div>
    <TablewareListTable
      :items="tablewareItems"
      :loading="reportsStore.isLoading"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  // components
  import DateRangePicker from '@/components/global/DateRangePicker.vue'
  import TablewareListTable from '@/components/reports/TablewareListTable.vue'

  // stores
  import { useReportsStore } from '@/stores/modules/reports'

  const reportsStore = useReportsStore()

  const handleDateRange = ({
    startUtc,
    endUtc,
  }: {
    startUtc: string
    endUtc: string
  }) => {
    reportsStore.fetchTablewares(startUtc, endUtc)
  }

  const tablewareItems = computed(() => reportsStore.tablewares.rows ?? [])
</script>
