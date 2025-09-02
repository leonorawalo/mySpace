<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useUIStore } from "@/stores/ui"

const moreOptions = ref(false)
const router = useRouter()
const uiStore = useUIStore()

function toggleMenu() {
  moreOptions.value = !moreOptions.value
}

// close dropdown when clicking outside
function handleClickOutside(event) {
  const dropdown = document.querySelector(".dropdown")
  if (dropdown && !dropdown.contains(event.target)) {
    moreOptions.value = false
  }
}

// logout function
function logout() {
  // Clear user session (example: localStorage)
  localStorage.removeItem("user") // or remove token
  moreOptions.value = false

  // Redirect to login
  router.push("/login")
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full z-50 bg-gray-100 border-b border-gray-300 py-4 px-4 flex flex-row justify-between items-center"
  >
    <!-- Logo -->
    <h1 class="text-4xl font-bold text-black">mySpace</h1>

    <!-- Nav -->
    <ul class="flex flex-row space-x-6 text-gray-600 font-thin items-center relative">
      <li class="hover:text-gray-900 hover:font-normal cursor-pointer" >Home</li>
      <li class="hover:text-gray-900 hover:font-normal cursor-pointer" @click="uiStore.toggleSideNav">Menu</li>

      <!-- Avatar -->
      <li class="relative">
        <div
          class="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
          @click.stop="toggleMenu"
        >
          <img
            src="@/assets/images/user.jpeg"
            alt="User"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Dropdown -->
        <ul
          v-show="moreOptions"
          class="dropdown absolute right-0 bg-white shadow-lg rounded-md mt-2 py-2 w-40 z-50"
        >
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">Logout</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
