import { createRouter, createWebHistory } from 'vue-router'
import DashboardRoutes from './dashboard'
import setupRouter from './guard/setupRouter'
import NotFoundPage from '@/pages/Error/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/** webpackChunkName "layout.main" */ '@/layouts/MainLayout'),
      redirect: '/hero',
      children: [...DashboardRoutes],
      meta: {
        authRequired: true
      }
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import(/* webpackChunkName "page.login" */ '@/pages/Login')
    },
    {
      name: 'Page Not Found',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    }
  ]
})

export const createAppRouter = (app) => {
  setupRouter(router, app)

  app.use(router)
}

export default router
