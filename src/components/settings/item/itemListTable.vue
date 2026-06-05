<template>
  <v-data-table
    :headers="itemHeaders"
    :items="items"
    :loading="loading"
    :sort-by="[{ key: 'code', order: 'asc' }]"
    item-value="id"
    fixed-header
    height="calc(100vh - 200px)"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in itemHeaders"
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

    <template #item.regulations="{ item }">
      {{ item.regulations?.length ? item.regulations.join(', ') : '' }}
    </template>

    <template #item.visitingForms="{ item }">
      {{ item.visitingForms?.length ? item.visitingForms.join(', ') : '' }}
    </template>

    <template #item.needCheckValue="{ item }">
      {{ item.needCheckValue ? '需要' : '不需要' }}
    </template>

    <template #item.needDaily="{ item }">
      {{ item.needDaily ? '列入' : '不列入' }}
    </template>

    <template #item.actions="{ item }">
      <v-icon
        icon="mdi-pencil"
        color="primary"
        class="mr-2"
        @click="onEdit(item)"
      />
      <v-icon icon="mdi-delete" color="error" @click="onDelete(item.id)" />
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'
  import { itemHeaders } from '@/data/tables/items'

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

  const emit = defineEmits(['edit', 'delete'])

  const onEdit = (item) => {
    emit('edit', item)
  }

  const onDelete = (id) => {
    emit('delete', id)
  }
</script>

<style lang="scss" scoped></style>
