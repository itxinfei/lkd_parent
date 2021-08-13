import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-ui.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import moment from 'moment'

import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '16px',
  defaultHeight: '16px'
})
Vue.config.productionTip = false

moment.locale('zh-cn')
Vue.filter('dateTimeFormat', function(value: string) {
  return moment(value).format('YYYY.MM.DD HH:mm:ss')
})

Vue.filter('numFormat', function(value: number) {
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})

Vue.use(VueAreaLinkage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
