// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: localStorage.getItem('username') || '',
    HomeImage: localStorage.getItem('HomeImage') || ''
  }),
  actions: {
    setUser(username, image) {
      this.username = username
      this.profilePic = image
      localStorage.setItem('username', username)
      localStorage.setItem('HomeImage', image)
    }
  }
})
