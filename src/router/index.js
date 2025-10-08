import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/MainLayout.vue'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  /*the one that works :')*/{ path: '/home', component: MainLayout, children:[{path: '', name: 'home', component: Home }] },
  { path: '/login', name: 'Login', component: LoginPage },
  {path: '/physicals', name: 'Physicals', component: () => import('@/views/Physicals.vue')},
  {path: '/accreate', name: 'Initial welcome', component: () => import('@/views/Signup/signup.vue')},
  {path: '/sform', name: 'Signing up form', component: () => import('@/views/Signup/sform.vue')},
  {path: '/tasks', name: 'Tasks', component: () => import('@/views/Tasks.vue')},
  {path: '/wallet', name: 'Wallet', component: () => import('@/views/Wallet.vue')},
  {path: '/gallery', name: 'Gallery', component: () => import('@/views/Gallery.vue')},
  {path: '/journal', name: 'Journal', component: () => import('@/views/Journal.vue')},
  {path: '/chats', name: 'Chats', component: () => import('@/views/Chats/Chats.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
