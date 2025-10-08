<script setup>
import { ref } from 'vue'
import { useUIStore } from "@/stores/ui"

const uiStore = useUIStore()

const TmenuItems = ref([
  { icon: new URL("@/assets/images/physicals.jpeg", import.meta.url).href, name: 'Physicals', path: '/physicals' },
  { icon: new URL("@/assets/images/chats.jpeg", import.meta.url).href, name: 'Chats', path: '/chats' },
  { icon: new URL("@/assets/images/tasks.jpeg", import.meta.url).href, name: 'Tasks', path: '/tasks' },
  { icon: new URL("@/assets/images/wallet.jpeg", import.meta.url).href, name: 'Wallet', path: '/wallet' },
  { icon: new URL("@/assets/images/gallery.jpeg", import.meta.url).href, name: 'Gallery', path: '/gallery' },
  { icon: new URL("@/assets/images/journal.jpeg", import.meta.url).href, name: 'Journal', path: '/journal' },
  { icon: new URL("https://i.pinimg.com/736x/4b/40/1a/4b401a328c203966507cbafed70c6d8b.jpg", import.meta.url).href, name: 'music', path: '/music' },
  { icon: new URL("https://www.pinterest.com/pin/2322237300150631/", import.meta.url).href, name: 'calender', path: '/calender' }
])

const BmenuItems = ref([
  { icon: new URL("@/assets/images/settings.jpeg", import.meta.url).href, name: 'Settings', path: '/settings' },
  { icon: new URL("@/assets/images/help.jpeg", import.meta.url).href, name: 'Help', path: '/help' },
  { icon: new URL("@/assets/images/user.jpeg", import.meta.url).href, name: 'Profile', path: '/profile' }
])
</script>

<template>
  <div
    class="flex flex-col h-screen bg-gray-100 w-[180px] md:w-[220px] lg:w-48 border-r border-gray-300 fixed top-0 left-0 pt-4 transition-transform transform"
    v-if="uiStore.isSideNavOpen"
  >
<h1 class="text-4xl font-bold text-black pl-4 pb-4">Echo</h1>
<hr class="border-gray-300 pb-8 " />
    <!-- Top menu -->
    <div class="flex-1">
      <nav class="px-4">
        <ul>
          <li
            v-for="i in TmenuItems"
            :key="i.name"
            class="py-1"
          >
            <RouterLink
               :to="i.path"
               class="block px-2 h-12 flex items-center space-x-3 transition-all duration-300 ease-in-out hover:bg-white hover:rounded-full"
               active-class="bg-white rounded-full ml-6"
            >
              <img :src="i.icon" alt="icon" class="w-6 h-6 rounded-full " />
              <span class="hover:ml-8">{{ i.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <hr class="border-gray-300 my-8" />

    <!-- Bottom menu -->
    <div class="flex-1 overflow-y-auto">
      <nav class="px-4">
        <ul>
          <li
            v-for="item in BmenuItems"
            :key="item.name"
            class="py-1"
          >
            <RouterLink
               :to="item.path"
               class="block px-2 h-12 flex items-center space-x-3 transition-all duration-300 ease-in-out hover:bg-white hover:rounded-full"
               active-class="bg-white rounded-full ml-6"
            >
              <img :src="item.icon" alt="icon" class="w-5 h-5 rounded-full" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
