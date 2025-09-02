// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

let idleTimer = null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: sessionStorage.getItem('token') || null,
    expiry: sessionStorage.getItem('expiry') || null
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post('http://127.0.0.1:4000/api/login', {
          email,
          password
        })
        this.user = res.data.user;
        this.token = res.data.token;

        // set expiry: 20 minutes from now
        const expiry = Date.now() + 20 * 60 * 1000
        this.expiry = expiry

        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('expiry', expiry)

        this.startIdleTimer()

        // optional: fetch current user
        this.user = await this.fetchUser()
      } catch (err) {
        throw new Error('Invalid credentials')
      }
    },

    async register(name, email, password) {
  try {
    const res = await axios.post('http://127.0.0.1:4000/api/register', {
      user: { name, email, password }
    })

    this.user = res.data.user
    this.token = res.data.token

    // set expiry: 5 minutes from now
    const expiry = Date.now() + 5 * 60 * 1000
    this.expiry = expiry

    sessionStorage.setItem('token', this.token)
    sessionStorage.setItem('expiry', expiry)

    this.startIdleTimer()

    return this.user
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Registration failed')
  }
},

    async fetchUser() {
      if (!this.token || this.isExpired()) {
        this.logout()
        return null
      }

      const res = await axios.get('http://127.0.0.1:4000/api/users', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.user = res.data
      return this.user
    },

    logout() {
      this.user = null
      this.token = null
      this.expiry = null
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('expiry')
      this.stopIdleTimer()
    },

    isExpired() {
      if (!this.expiry) return true
      return Date.now() > parseInt(this.expiry, 10)
    },

    // idle timer stuff
    startIdleTimer() {
      this.stopIdleTimer()

      const resetTimer = () => {
        this.expiry = Date.now() + 20 * 60 * 1000
        sessionStorage.setItem('expiry', this.expiry)

        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
          this.logout()
        }, 20 * 60 * 1000)
      }

      ['mousemove', 'keydown', 'click'].forEach(evt =>
        window.addEventListener(evt, resetTimer)
      )

      resetTimer()
    },

    stopIdleTimer() {
      clearTimeout(idleTimer)
      ;['mousemove', 'keydown', 'click'].forEach(evt =>
        window.removeEventListener(evt, () => {})
      )
    }
  }
})
