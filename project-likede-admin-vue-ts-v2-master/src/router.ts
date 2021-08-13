import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登录', hidden: true }
    },
    {
      path: '/404',
      component: () => import('@/views/404.vue'),
      meta: { title: '404', hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '立可得',
            icon: 'home'
          }
        }
      ]
    },
    {
      path: '/task',
      component: Layout,
      redirect: '/task/business',
      meta: {
        title: '工单管理',
        icon: 'task'
      },
      children: [
        {
          path: 'business',
          component: () => import('@/views/task/index.vue'),
          meta: {
            title: '运营工单',
            isRepair: false
          }
        },
        {
          path: 'operation',
          component: () => import('@/views/task/index.vue'),
          meta: {
            title: '运维工单',
            isRepair: true
          }
        }
      ]
    },
    {
      path: '/node',
      component: Layout,
      redirect: '/node/region',
      meta: {
        title: '点位管理',
        icon: 'node'
      },
      children: [
        {
          path: 'region',
          component: () => import('@/views/region/index.vue'),
          meta: {
            title: '区域管理'
          }
        },
        {
          path: 'node',
          component: () => import('@/views/node/index.vue'),
          meta: {
            title: '点位管理'
          }
        },
        {
          path: 'partner',
          component: () => import('@/views/partner/index.vue'),
          meta: {
            title: '合作商管理'
          }
        }
      ]
    },
    {
      path: '/vm',
      component: Layout,
      redirect: '/vm/index',
      meta: {
        title: '设备管理',
        icon: 'vm'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/vm/index.vue'),
          meta: {
            title: '设备管理'
          }
        },
        {
          path: 'status',
          component: () => import('@/views/vm-status/index.vue'),
          meta: {
            title: '设备状态'
          }
        },
        {
          path: 'type',
          component: () => import('@/views/vm-type/index.vue'),
          meta: {
            title: '设备类型管理'
          }
        }
      ]
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/user/index',
      meta: {
        title: '人员管理',
        icon: 'user'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/user/index.vue'),
          meta: {
            title: '人员列表'
          }
        },
        {
          path: 'user-task-stats',
          component: () => import('@/views/user-task-stats/index.vue'),
          meta: {
            title: '人效统计'
          }
        },
        {
          path: 'user-work',
          component: () => import('@/views/user-work/index.vue'),
          meta: {
            title: '工作量列表'
          }
        }
      ]
    },
    {
      path: '/sku',
      component: Layout,
      redirect: '/sku/sku',
      meta: {
        title: '商品管理',
        icon: 'sku'
      },
      children: [
        {
          path: 'sku-class',
          component: () => import('@/views/sku-class/index.vue'),
          meta: {
            title: '商品类型'
          }
        },
        {
          path: 'sku',
          component: () => import('@/views/sku/index.vue'),
          meta: {
            title: '商品管理'
          }
        }
      ]
    },
    {
      path: '/policy',
      component: Layout,
      redirect: '/policy/index',
      meta: {
        title: '策略管理',
        icon: 'policy'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/policy/index.vue'),
          meta: {
            title: '策略管理',
            icon: 'policy'
          }
        }
      ]
    },
    {
      path: '/order',
      component: Layout,
      redirect: '/order/index',
      meta: {
        title: '订单管理',
        icon: 'order'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/order/index.vue'),
          meta: {
            title: '订单管理',
            icon: 'order'
          }
        }
      ]
    },
    {
      path: '/report',
      component: Layout,
      redirect: '/report/index',
      meta: {
        title: '对账管理',
        icon: 'report'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/sku-sale-stats/index.vue'),
          meta: {
            title: '对账统计',
            icon: 'report'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
