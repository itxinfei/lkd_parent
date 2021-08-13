import Vue from 'vue'
import VueRouter, { RawLocation, RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return (originalPush as Function).call(this, location).catch((err: Error) => err)
}

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    meta: { notNeedAuth: true }
  },
  {
    path: '/404',
    component: () => import('@/pages/error/404.vue'),
    meta: { notNeedAuth: true }
  },
  {
    path: '/',
    component: () => import('@/pages/Main.vue'),
    children: [
      {
        path: '/',
				component: () => import('@/pages/Index.vue'),
        meta: {
          title: '概况',
          id: '概况'
        }
      },{
        path: '/Partner/PartnerList',
        component: () => import('@/pages/Partner/PartnerList.vue'),
        meta: {
          title: '概况',
          id: '概况'
        }
      }
    ]
  },
  {
    path: '*', redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
