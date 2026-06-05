<template>
  <v-data-table
    :headers="userHeaders"
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
          v-for="header in userHeaders"
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

    <template #item.roles="{ item }">
      {{ item.roles?.[0]?.role || '-' }}
    </template>

    <template #item.actions="{ item }">
      <v-icon
        icon="mdi-pencil"
        color="primary"
        class="mr-2"
        @click="onEdit(item)"
      />
      <v-icon
        icon="mdi-key"
        class="mr-2"
        color="primary"
        @click="onEditPassword(item)"
      />
      <v-icon icon="mdi-delete" color="error" @click="onDelete(item.id)" />
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'
  import { userHeaders } from '@/data/tables/users'

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

  const emit = defineEmits(['edit', 'delete', 'editPassword'])

  const onEdit = (item) => {
    emit('edit', item)
  }

  const onDelete = (id) => {
    emit('delete', id)
  }

  const onEditPassword = (item) => {
    emit('editPassword', item)
  }
</script>

<style lang="scss" scoped></style>
