<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <v-container
              v-for="h in dialogHeaders"
              :key="h.key"
              class="pa-0"
              fluid
            >
              <div>
                <label class="text-body-1 text-medium-emphasis">{{
                  h.title
                }}</label>
                <v-text-field
                  v-if="h.key !== 'roles'"
                  v-model="form[h.key]"
                  :placeholder="`請輸入${h.title}`"
                  :type="
                    h.key === 'password'
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : 'text'
                  "
                  density="compact"
                  :append-inner-icon="
                    h.key === 'password'
                      ? showPassword
                        ? 'mdi-eye'
                        : 'mdi-eye-off'
                      : undefined
                  "
                  @click:append-inner="handlePasswordIconClick"
                  :rules="
                    h.key === 'password' && isEdit.value
                      ? []
                      : [(v) => !!v || `${h.title}為必填`]
                  "
                  variant="outlined"
                ></v-text-field>
                <v-select
                  v-else
                  v-model="form[h.key]"
                  :items="RoleItems"
                  variant="outlined"
                ></v-select>
              </div>
            </v-container>
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
  import { computed, ref, reactive } from 'vue'

  // stores
  import { useUsersStore } from '@/stores/modules/users'
  import { useSnackbarStore } from '@/stores/snackbar'

  //datas
  import { userDialogHeader } from '@/data/tables/users.ts'

  const usersStore = useUsersStore()

  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const title = ref('新增帳號')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const RoleItems = ['學校管理員', '巡檢人員']

  const form = reactive({
    roles: RoleItems[0],
    name: '',
    username: '',
    password: '',
    phone: '',
    email: '',
  })

  const showPassword = ref(false)

  const dialogHeaders = computed(() =>
    isEdit.value
      ? userDialogHeader.filter((h) => h.key !== 'password')
      : userDialogHeader,
  )

  const handlePasswordIconClick = () => {
    showPassword.value = !showPassword.value
  }

  const resetForm = () => {
    form.roles = RoleItems[0]
    form.name = ''
    form.username = ''
    form.password = ''
    form.phone = ''
    form.email = ''
    showPassword.value = false
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = (item = null) => {
    resetForm()
    if (item) {
      title.value = '編輯帳號'
      isEdit.value = true
      editId.value = item.id
      form.roles = item.roles?.[0]?.role || RoleItems[0]
      form.name = item.name
      form.username = item.username
      form.phone = item.phone
      form.email = item.email
      isFormValid.value = true
    } else {
      title.value = '新增帳號'
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    const payload = {
      roles: [form.roles],
      name: form.name,
      username: form.username,
      phone: form.phone,
      email: form.email,
    }

    if (!isEdit.value) {
      Object.assign(payload, { password: form.password })
    }

    try {
      if (isEdit.value) {
        await usersStore.editUser(editId.value, payload)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await usersStore.addUser(payload)
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
