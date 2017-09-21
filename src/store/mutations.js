export const state = {
  toast: {
    show: false,
    time: 2000,
    type: 'warn', // success, warn, cancel, text
    text: ''
  },
  loading: {
    show: false,
    text: ''
  },
  pintuanProduct: {},
  pintuanMyGroup: {},
  pintuanAllGroup: {}
}

export const mutations = {
  // 设置提示信息
  showToast (state, payload) {
    state.toast.show = true
    state.toast.time = payload.time || 2000
    state.toast.type = payload.type || 'success'
    state.toast.text = payload.text || ''
  },
  // 隐藏提示信息
  hideToast (state) {
    state.toast.show = false
  },
  // 设置加载中信息
  showLoading (state, payload) {
    state.loading.show = true
    state.loading.text = payload.text || ''
  },
  // 隐藏加载中信息
  hideLoading (state) {
    state.loading.show = false
  },
  setOrderInfo (state, payload) {
    state.orderInfo = payload
  }
}
