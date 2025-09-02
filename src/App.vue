<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

import TopNav from './components/TopNav.vue'
import SideNav from './components/SideNav.vue'
import FooterPart from './components/FooterPart.vue'

const route = useRoute()

// reactively update based on current route
const showLayout = computed(() => route.path !== "/login")

onMounted(() => {
  if (auth.token && !auth.isExpired()) {
    auth.startIdleTimer()
    auth.fetchUser()
  } else {
    auth.logout()
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopNav v-if="showLayout" />
    <SideNav v-if="showLayout" />

    <router-view />

    <FooterPart />
  </div>
</template>
