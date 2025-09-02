<template>
  <div class="flex flex-col min-h-screen">
    <!-- Top Nav -->
    <TopNav @toggleSideNav="uiStore.toggleSideNav" />

    <div class="flex flex-1 pt-16">
      <!-- Side Nav -->
      <transition name="slide">
        <SideNav
          v-show="uiStore.isSideNavOpen || isLargeScreen"
          class="transition-all duration-300 w-64 shrink-0"
        />
      </transition>

      <!-- Routed Content -->
      <main
        class="flex-1 p-4 transition-all duration-300"
        :class="{
          'ml-64': isLargeScreen && uiStore.isSideNavOpen,
          'ml-0': !uiStore.isSideNavOpen || !isLargeScreen
        }"
      >
        <router-view class="flex-1" />
      </main>
    </div>

    <!-- Footer -->
    <FooterPart />
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TopNav from './TopNav.vue'
import SideNav from './SideNav.vue'
import FooterPart from './FooterPart.vue'

const uiStore = useUIStore()

// Responsive tracking
const isLargeScreen = ref(window.innerWidth >= 1024)

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 1024
  if (isLargeScreen.value) {
    uiStore.isSideNavOpen = true // force open on large screens
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
/* Slide animation for small screen sidenav */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
