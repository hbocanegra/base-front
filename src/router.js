import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Role } from '@/constants/role'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
          path: '/login',
      },
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/NoAuth'),
      children: [
        // Login
        {
          name: 'Login',
          path: 'login',
          meta: {
            requiresAuth: false,
            authorize: [],
          },
          component: () => import('@/views/dashboard/pages/Login'),
        },
        // Logout
        {
            name: 'Logout',
            path: 'logout',
            meta: {
              requiresAuth: false,
              authorize: [],
            },
            component: () => import('@/views/dashboard/components/core/Logout'),
        },
        // RecoverPassword
        {
            name: 'RecoverPassword',
            path: 'recoverpassword',
            meta: {
              requiresAuth: false,
              authorize: [],
            },
            component: () => import('@/views/dashboard/pages/RecoverPassword'),
        },
        // Unauthorize
        {
          name: 'Unauthorized',
          path: 'unauthorized',
          meta: {
            requiresAuth: false,
            authorize: [],
          },
          component: () => import('@/views/dashboard/pages/Unauthorized'),
      },
      ],
    },
    {
      path: '/admin',
      meta: {
        requiresAuth: true,
        authorize: [Role.Admin],
      },
      component: () => import('@/views/dashboard/Auth'),
      children: [
        // Dashboard
        {
            name: 'Home administrador',
            path: 'home',
            meta: {
              requiresAuth: true,
              authorize: [Role.Admin],
            },
            component: () => import('@/views/dashboard/pages/admin/Home'),
        },
      ],
    },
    {
      path: '/user',
      meta: {
        requiresAuth: true,
        authorize: [Role.User],
      },
      component: () => import('@/views/dashboard/Auth'),
      children: [
        // Dashboard
        {
            name: 'Home usuario',
            path: 'home',
            meta: {
              requiresAuth: true,
              authorize: [Role.User],
            },
            component: () => import('@/views/dashboard/pages/user/Home'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authorize = to.meta.authorize
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.authorized) {
        if (authorize.length && authorize.includes(localStorage.getItem('role'))) {
          next()
        } else {
          next('/unauthorized')
        }
      } else {
          next('/login')
      }
  } else {
      next()
  }
})

export default router
