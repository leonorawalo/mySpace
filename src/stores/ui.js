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
/* Alternative Options:
export const useUIStore = defineStore('ui', {
  state: () => ({
    isSideNavOpen: true,
  }),
  actions: {
    toggleSideNav() {
      this.isSideNavOpen = !this.isSideNavOpen
    },
    closeSideNav() {
      this.isSideNavOpen = false
    }
  }
})
  class="flex-1 p-4 transition-all duration-300"
        :class="{
          'ml-48': isLargeScreen && sideNavOpen, // content shrinks
          'ml-0': !isLargeScreen || !sideNavOpen // fills full width
        
*/