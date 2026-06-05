<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card title="選擇巡檢表單">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <label class="text-body-1 text-medium-emphasis">選擇表單</label>
              <v-select
                v-model="form.formId"
                :items="formsData"
                item-title="title"
                item-value="id"
                :rules="[(v) => !!v || '必須選擇']"
                variant="outlined"
              ></v-select>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="取消" variant="flat" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="送出"
            variant="flat"
            :disabled="!isFormValid"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <InspectionFormCheckDialog ref="checkDialogRef" />
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'

  // components
  import InspectionFormCheckDialog from '@/components/inspection/InspectionFormCheckDialog.vue'

  //stores
  import { useFormsStore } from '@/stores/modules/forms'

  const router = useRouter()
  const formsStore = useFormsStore()
  const checkDialogRef = ref(null)

  const dialog = ref(false)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const form = reactive({
    formId: null,
  })

  const formsData = computed(() => {
    return formsStore.forms.map((f) => ({
      id: f.id,
      title: f.title,
    }))
  })

  const resetForm = () => {
    form.formId = null
    isFormValid.value = false
  }

  const open = async (item) => {
    await formsStore.fetchForms()
    resetForm()
    if (item) {
      console.log('open item delete?', item)
      form.formId = item.id
      isFormValid.value = true
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    dialog.value = false
    checkDialogRef.value?.open(form.formId)
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
