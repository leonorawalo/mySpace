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
const showLayout = computed(() => route.path !== "/login" && route.path !== "/accreate" && route.path !== "/sform")

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
    <div class="h-16" v-if="showLayout"></div> <!-- spacer for fixed top nav -->
    <SideNav class="flex-1" v-if="showLayout" />

    <router-view  class=""/>

    <FooterPart />
  </div>
</template>
