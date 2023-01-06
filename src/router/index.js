import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: () => {
      return { name: 'SearchFlight' };
    }
  },
  {
    path: '/search-flight',
    name: 'SearchFlight',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SearchFlight.vue')
  },
  {
    path: '/flight-list',
    name: 'FlightList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/FlightList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
