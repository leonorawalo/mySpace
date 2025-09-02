import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/MainLayout.vue'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  { path: '/', component: MainLayout, children:[{path: '/', name: 'home', component: Home }] },
  { path: '/login', name: 'Login', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
