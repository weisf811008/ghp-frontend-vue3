<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1000">
      <v-card>
        <v-card-text class="d-flex flex-wrap">
          <div
            v-for="formTitle in inspectionDetailForm"
            :key="formTitle.key"
            class="w-50"
          >
            <span class="text-body-1 text-medium-emphasis"
              >{{ formTitle.title }}:
            </span>
            <span class="text-body-1 text-medium-emphasis"
              >{{
                formatDate(getFormDataValue(formTitle.key), formTitle.format)
              }}
            </span>
          </div>
          <InspectionDetailListTable :items="formTableData" />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="關閉" variant="flat" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // components
  import InspectionDetailListTable from '@/components/inspection/InspectionDetailListTable.vue'

  // stores
  import { useInspectionsStore } from '@/stores/modules/inspections'

  // data
  import { inspectionDetailForm } from '@/data/tables/inspectionsDetail'

  const inspectionsStore = useInspectionsStore()
  const dialog = ref(false)
  const formData = ref<Record<string, any>>({})
  const formTableData = ref<any[]>([])

  const getFormDataValue = (key: string) => {
    if (!formData.value || !key) return ''
    return (
      key.split('.').reduce(
        (acc, segment) => {
          return acc && typeof acc === 'object' ? acc[segment] : ''
        },
        formData.value as Record<string, any>,
      ) ?? ''
    )
  }

  const formatDate = (value: string, format?: string) => {
    if (!value) return ''
    if (!format) return value
    const date = new Date(value)
    const twDate = new Date(date.getTime() + 8 * 60 * 60 * 1000) // 台灣時區為 UTC+8
    const yyyy = twDate.getUTCFullYear()
    const mm = String(twDate.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(twDate.getUTCDate()).padStart(2, '0')
    const hh = String(twDate.getUTCHours()).padStart(2, '0')
    const min = String(twDate.getUTCMinutes()).padStart(2, '0')

    if (format === 'date') return `${yyyy}-${mm}-${dd}`
    if (format === 'createdAt') return `${yyyy}/${mm}/${dd} ${hh}:${min}`
  }

  const open = async (item = null) => {
    formData.value = item || {}
    await inspectionsStore.fetchInspectionById(formData.value.id)
    formTableData.value = inspectionsStore.inspection?.details ?? []
    dialog.value = true
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
