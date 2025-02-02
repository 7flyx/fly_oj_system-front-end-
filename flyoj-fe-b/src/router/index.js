import { getToken } from '@/utils/cookie'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/oj/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/oj/layout',
      name: 'layout',
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: 'question',
          name: 'question',
          component: () => import('../views/Question.vue')
        },
        {
          path: 'exam',
          name: 'exam',
          component: () => import('../views/Exam.vue')
        },
        {
          path: 'cuser',
          name: 'cuser',
          component: () => import('../views/Cuser.vue')
        },
      ]
    },
    
  ]
})



// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 有token的情况
    if (to.path === '/oj/login') {
      next({path: '/oj/layout'}) // 跳转到后台管理页面
    } else {
      next() //继续当前路由，执行下去。不进行路由跳转
    }
  } else { // 没有token的情况
    if (to.path !== '/oj/login') {
      next({path: '/oj/login'})
    } else {
      next() //继续当前路由，执行下去。不进行路由跳转
    }
  }
})


export default router
