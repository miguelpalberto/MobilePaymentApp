import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Storage } from "@ionic/storage";

export default (axios) => {


  
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
  
  
  
  router.beforeEach(async (to, from, next) => {
    const store = new Storage();
    await store.create();
    const token = await store.get("token");
    if (!token && to.path !== "/login") {
      next({ path: '/login' });
    } else {
      to.params = {...to.params, token}
      axios.defaults.headers.common.Authorization = "Bearer " + token;
      const phoneNumber = await store.get("phone_number");
      console.log("phone number", phoneNumber);
  
      if (phoneNumber) {
        to.params = {...to.params, phoneNumber}
      }
      next()
    }
  })
  
return router;  
  
}