<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <label class="text-body-1 text-medium-emphasis">類別</label>
              <v-select
                v-model="form.class"
                :items="classItems"
                :rules="[(v) => !!v || '類別為必填']"
                variant="outlined"
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">編號</label>
              <v-text-field
                v-model="form.code"
                placeholder="請輸入編號"
                type="text"
                :rules="[(v) => !!v || '編號為必填']"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">訪視項目 </label>
              <v-textarea
                v-model="form.description"
                variant="outlined"
                :rules="[(v) => !!v || '訪視項目為必填']"
                placeholder="請輸入訪視項目"
              ></v-textarea>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="取消" variant="flat" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="存擋"
            variant="flat"
            :disabled="!isFormValid"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useVisitingFormsStore } from '@/stores/modules/visitingForms'
  import { useSnackbarStore } from '@/stores/snackbar'

  const visitingFormsStore = useVisitingFormsStore()
  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const title = ref('新增訪視表條文')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const classItems = ['衛生訪視內容']

  const form = reactive({
    class: '',
    code: '',
    description: '',
  })

  const resetForm = () => {
    form.class = '衛生訪視內容'
    form.code = ''
    form.description = ''
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = (item = null) => {
    resetForm()
    if (item) {
      title.value = '編輯訪視條文'
      isEdit.value = true
      editId.value = item.id
      form.class = item.class
      form.code = item.code
      form.description = item.description
      isFormValid.value = true
    } else {
      title.value = '新增訪視條文'
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      if (isEdit.value) {
        await visitingFormsStore.editVisitingForm(editId.value, form)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await visitingFormsStore.addVisitingForm(form)
        snackbarStore.showMessage('新增成功', 'success')
      }
      dialog.value = false
    } catch (error) {
      snackbarStore.showMessage(isEdit.value ? '修改失敗' : '新增失敗', 'error')
    }
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
