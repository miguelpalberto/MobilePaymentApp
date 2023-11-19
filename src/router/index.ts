import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/transactions/:phone',
    props: (route) => ({ phone: route.params.phone }),
    component: () => import ('../components/Transactions.vue')
  },
  {
    path: '/piggyBank/:phone',
    props: (route) => ({ phone: route.params.phone }),
    component: () => import ('../components/PiggyBank.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
