<template>
  <v-data-table
    :headers="inspectionHeaders"
    :items="items"
    :loading="loading"
    item-value="id"
    fixed-header
    height="calc(100vh - 200px)"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in inspectionHeaders"
          :key="header.key"
          :style="header.width ? `width: ${header.width}` : ''"
        >
          {{ header.title }}
        </th>
      </tr>
    </template>

    <template #item.index="{ index }">
      {{ (page - 1) * itemsPerPage + index + 1 }}
    </template>

    <template #item.date="{ item }">
      {{ formatIsoString('date', item.date) }}
    </template>

    <template #item.createdAt="{ item }">
      {{ formatIsoString('datetime', item.createdAt) }}
    </template>

    <template #item.actions="{ item }">
      <v-btn
        prepend-icon="mdi-file-document-multiple"
        variant="text"
        @click="openDetail(item)"
      >
        <span>查看巡檢紀錄</span>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'
  import { inspectionHeaders } from '@/data/tables/inspections'
  import { formatIsoString } from '@/utils/date'

  defineProps({
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const page = ref(1)
  const itemsPerPage = ref(10)

  const emit = defineEmits(['edit'])

  const openDetail = (item) => {
    emit('edit', item)
  }
</script>

<style lang="scss" scoped></style>
