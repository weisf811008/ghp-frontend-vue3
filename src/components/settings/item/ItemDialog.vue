<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <label class="text-body-1 text-medium-emphasis">檢核大項</label>
              <v-select
                v-model="form.categoryId"
                :items="categories"
                item-title="category"
                item-value="id"
                :rules="[(v) => !!v || '選擇大項']"
                variant="outlined"
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">編號</label>
              <v-text-field
                v-model="form.no"
                placeholder="請輸入編號"
                type="text"
                :rules="[(v) => !!v || '編號為必填']"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">檢核細項 </label>
              <v-textarea
                v-model="form.item"
                variant="outlined"
                :rules="[(v) => !!v || '檢核細項內容為必填']"
                placeholder="請輸入檢核細項"
              ></v-textarea>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">週期</label>
              <v-select
                v-model="form.period"
                :items="periods"
                :rules="[(v) => !!v || '週期為必填']"
                variant="outlined"
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">區域</label>
              <v-select
                v-model="form.area"
                :items="areas"
                :rules="[(v) => !!v || '區域為必填']"
                variant="outlined"
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">GHP條文</label>
              <v-select
                v-model="form.regulations"
                :items="regulations"
                item-title="code"
                item-value="id"
                :rules="[(v) => !!v || 'GHP條文為必填']"
                variant="outlined"
                multiple
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">訪視表</label>
              <v-select
                v-model="form.visitingForms"
                :items="visitingForms"
                item-title="code"
                item-value="id"
                :rules="[(v) => !!v || '訪視表為必填']"
                variant="outlined"
                multiple
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">需填資料</label>
              <v-radio-group v-model="form.needCheckValue">
                <v-radio label="需要" :value="true"></v-radio>
                <v-radio label="不需要" :value="false"></v-radio>
              </v-radio-group>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis"
                >每日衛生管理日誌</label
              >
              <v-radio-group v-model="form.needDaily">
                <v-radio label="列入" :value="true"></v-radio>
                <v-radio label="不列入" :value="false"></v-radio>
              </v-radio-group>
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
  import { storeToRefs } from 'pinia'

  //stroe
  import { useItemsStore } from '@/stores/modules/items'
  import { useCategoriesStore } from '@/stores/modules/categories'
  import { usePeriodsStore } from '@/stores/modules/periods'
  import { useAreasStore } from '@/stores/modules/areas'
  import { useRegulationsStore } from '@/stores/modules/regulations'
  import { useVisitingFormsStore } from '@/stores/modules/visitingForms'
  import { useSnackbarStore } from '@/stores/snackbar'

  const itemsStore = useItemsStore()
  const categoriesStore = useCategoriesStore()
  const periodsStore = usePeriodsStore()
  const areasStroe = useAreasStore()
  const regulationsStore = useRegulationsStore()
  const visitingFormsStore = useVisitingFormsStore()
  const snackbarStore = useSnackbarStore()
  const { categories } = storeToRefs(categoriesStore)
  const { periods } = storeToRefs(periodsStore)
  const { areas } = storeToRefs(areasStroe)
  const { regulations } = storeToRefs(regulationsStore)
  const { visitingForms } = storeToRefs(visitingFormsStore)

  const dialog = ref(false)
  const title = ref('新增細項')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const form = reactive({
    categoryId: null,
    no: '',
    item: '',
    period: '',
    area: '',
    regulations: [],
    visitingForms: [],
    needCheckValue: true,
    needDaily: true,
  })

  const resetForm = () => {
    form.categoryId = categories.value[0].id ?? null
    form.no = ''
    form.item = ''
    form.period = periods.value[0] ?? ''
    form.area = areas.value[0] ?? ''
    form.regulations = []
    form.visitingForms = []
    form.needCheckValue = true
    form.needDaily = true
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = async (item = null) => {
    dialog.value = true

    //確保資料已載入
    await Promise.all([
      categoriesStore.fetchCategories(),
      periodsStore.fetchPeriods(),
      areasStroe.fetchAreas(),
      regulationsStore.fetchRegulations(),
      visitingFormsStore.fetchVisitingForms(),
    ])

    resetForm()
    if (item) {
      title.value = '編輯細項'
      isEdit.value = true
      editId.value = item.id
      form.categoryId = item.categoryId
      form.no = item.no
      form.item = item.item
      form.period = item.period
      form.area = item.area
      form.regulations = regulations.value
        .filter((r) => item.regulations.includes(r.code))
        .map((r) => r.id)
      form.visitingForms = visitingForms.value
        .filter((v) => item.visitingForms.includes(v.code))
        .map((v) => v.id)
      form.needCheckValue = item.needCheckValue
      form.needDaily = item.needCheckValue
      isFormValid.value = true
    } else {
      title.value = '新增細項'
    }
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      if (isEdit.value) {
        await itemsStore.editItem(editId.value, form)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await itemsStore.addItem(form)
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
