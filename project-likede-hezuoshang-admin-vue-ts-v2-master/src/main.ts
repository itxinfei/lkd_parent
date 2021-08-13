import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import NProgress from 'nprogress'
import { sync } from 'vuex-router-sync'
import mcommon from '@hanyk/mcommon'
import api from '@/api'
import Cookies from 'js-cookie'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$api = api

moment.locale('zh-cn')
Vue.use(ElementUi, { size: 'small', zIndex: 3000 })
Vue.use(mcommon)
sync(store, router)

router.beforeEach((to, form, next) => {
  NProgress.start()
  if (Cookies.get('creditechToken')) {
    next()
  } else {
    if (!to.meta.notNeedAuth) next('/login')
    else next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
