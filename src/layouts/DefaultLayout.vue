無效 ```vue
<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" :permanent="lgAndUp">
      <v-list nav>
        <template v-for="item in navItems" :key="item.title">
          <v-list-group v-if="item.children" :value="item.title">
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.title"
              >
              </v-list-item>
            </template>
            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :title="child.title"
              :to="child.to"
            >
            </v-list-item>
          </v-list-group>

          <!-- 沒有子項目 -->
          <v-list-item
            v-else
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.to"
          >
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :title="pageTitle">
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="!lgAndUp"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="text-none"
            prepend-icon="mdi-account"
            variant="outlined"
            border
          >
            {{ user.username }}
          </v-btn>
        </template>
        <v-list density="compact" min-width="0">
          <v-list-item @click="handleLogout" title="登出" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <div class="pa-4 w-100">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { storeToRefs } from 'pinia'
  import { navItems } from '@/data/navigation'
  import { useAuthStore } from '@/stores/auth'

  const route = useRoute()
  const authStore = useAuthStore()
  const { lgAndUp } = useDisplay()

  const { user } = storeToRefs(authStore)
  const drawer = ref(true)
  const pageTitle = computed(() => route.meta.title || '食安管理系統')

  const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
  }
</script>
