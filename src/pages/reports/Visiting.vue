<template>
  <div class="d-flex flex-column fill-height">
    <div class="d-flex align-center ga-2 mb-4">
      <DateRangePicker @update:dateRange="handleDateRange" />
    </div>
    <VisitingListTable
      :items="visitingItems"
      :loading="reportsStore.isLoading"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  // components
  import DateRangePicker from '@/components/global/DateRangePicker.vue'
  import VisitingListTable from '@/components/reports/VisitingListTable.vue'

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
    reportsStore.fetchVisitings(startUtc, endUtc)
  }

  const visitingItems = computed(() => reportsStore.visitings ?? [])
</script>
