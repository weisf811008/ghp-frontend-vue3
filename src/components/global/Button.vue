<template>
  <v-btn
    class="text-none"
    prepend-icon="mdi-plus"
    variant="outlined"
    border
    @click="openDialog"
    >{{ buttonText }}
  </v-btn>
  <component :is="currentDialog" ref="dialogRef" />
</template>

<script setup>
  import { ref, computed } from 'vue'
  import RegulationDialog from '@/components/settings/regulation/RegulationDialog.vue'
  import VisitingFormDialog from '@/components/settings/visitingForm/VisitingFormDialog.vue'
  import CategoryDialog from '@/components/settings/category/CategoryDialog.vue'
  import ItemDialog from '@/components/settings/item/ItemDialog.vue'
  import FormDialog from '@/components/form/FormDialog.vue'
  import InspectionDetailDialog from '@/components/inspection/InspectionDetailDialog.vue'
  import InspectionFormDialog from '@/components/inspection/InspectionFormDialog.vue'
  import UserDialog from '@/components/user/UserDialog.vue'

  const props = defineProps({
    buttonText: {
      type: String,
      default: '',
    },
    dialogName: {
      type: String,
      default: '',
    },
  })

  const dialogMap = {
    regulation: RegulationDialog,
    visitingForm: VisitingFormDialog,
    category: CategoryDialog,
    item: ItemDialog,
    form: FormDialog,
    inspectionDetail: InspectionDetailDialog,
    inspectionFormDialog: InspectionFormDialog,
    user: UserDialog,
  }

  const currentDialog = computed(() => dialogMap[props.dialogName])
  const dialogRef = ref(null)
  const openDialog = () => {
    dialogRef.value?.open()
  }
</script>

<style lang="scss" scoped></style>
