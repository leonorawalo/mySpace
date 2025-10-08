import { defineStore } from "pinia"
import { ref } from "vue"

export const useUIStore = defineStore("ui", () => {
  const isSideNavOpen = ref(true) //so that it shows automatically on loading

  function toggleSideNav() {
    isSideNavOpen.value = !isSideNavOpen.value
    
  }

  function closeSideNav() {
    isSideNavOpen.value = false
  }

  /*function routedview() {
    while (isSideNavOpen.value === true) {

    }}*/

  return { isSideNavOpen, toggleSideNav, closeSideNav }
})
