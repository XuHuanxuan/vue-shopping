import { storageGetInfo, storageSetInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 用户个人认证信息
      userInfo: storageGetInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      storageSetInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
