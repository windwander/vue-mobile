export const state = {
  errorMsg: ''
}

export const mutations = {
  // 登录出错
  errorLogin (state, res) {
    state.errorLogin = res
  }
}
