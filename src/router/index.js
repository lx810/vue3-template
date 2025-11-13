import { createRouter, createWebHashHistory } from 'vue-router'
import { usePageTitle } from './helper'

// const whiteList = ['/login'] // 白名单
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Test',
      // 注意： 此组件自行创建引入！！！！！！！！！
      component: () => import('@/views/index.vue'),
      meta: {
        title: '测试'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  usePageTitle(to)
  next()
})

async function setupRouter(app) {
  app.use(router)
}

export { router, setupRouter }
