import axios from 'axios'

export const actions = {
  /* GET /v/inviteFriend/details 查询用户邀请的好友详情 */
  getInviteDetails ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios.get('/api/v2/fworker/rest/v/inviteFriend/details', {
        params: data // 请求参数
      })
        .then(res => {
          state.inviteDetails = res.data
          resolve()
        })
        .catch(error => {
          oneError(commit, state, error, '')
          reject(error)
        })
    })
  }
}
// 通用的错误处理
function oneError (commit, state, error, name) {
  console.dir(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    // state.snackbarMsg = name + '失败：' + (error.response.data && error.response.data.message) || '回应失败'
    // commit('showSnackbar')
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    // state.snackbarMsg = name + '失败：请求失败'
    // commit('showSnackbar')
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    // state.snackbarMsg = name + '失败：' + error.message
    // commit('showSnackbar')
  }
}
