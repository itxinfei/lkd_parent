import Vue from 'vue'
import Vuex from 'vuex'
// import { RouteConfig } from 'vue-router'
import Cookies from 'js-cookie'
import api from '@/api/index'
import router from '@/router'

Vue.use(Vuex)

interface RootState {
  loading: boolean;
  token: string | undefined;
  userInfo: {} | null;
}

export default new Vuex.Store({
  state: {
    loading: false,
    token: Cookies.get('creditechToken') || '',
    userInfo: {
      // avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597897293647&di=af96aadb216731fb3aef30fdb2714ea8&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201910%2F23%2F20191023165146_VdXQi.thumb.400_0.jpeg',
      avatar: require('@/assets/Common/avatar.png'),
      userName: '',
      userId: ''
    }
  },
  mutations: {
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateToken (state, res) {
        state.token = res
        Cookies.set('creditechToken', res)
      // if (state.token) {
      //   state.token = res
      //   Cookies.set('creditechToken', res)
      // } else {
      //   state.token = undefined
      //   Cookies.remove('creditechToken')
      // }
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = {
        ...state.userInfo,
        ...userInfo
      }
      Cookies.set('setUserInfo', JSON.stringify(userInfo))
    }
  },
  actions: {
    async login ({ commit }, params) {
      const res = await api.login({
        ...params
      })
      if (res && res !== null) {
        if (res.success === true) {
          commit('updateToken', res.token)
          commit('updateUserInfo', {
            userName: res.userName,
            userId: res.userId
          })
          router.push('/')
        }
      }
      
    },
    logout ({ commit }) {
      commit('updateToken')
      commit('updateUserInfo')
      Cookies.remove('creditechToken')
      Cookies.remove('setUserInfo')
      router.replace('/login')
      
      setTimeout(() => {
        window.location.reload()
      }, 0)
    }
  }
})
