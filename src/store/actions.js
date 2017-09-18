import axios from 'axios'

export const actions = {
  /**
   * 获取短信验证码
   */
  sendSmsCode ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/sendSmsCode?isajax=true&verificationCodeType=6&phone=' + data.phone + '&graphCode=' + data.graphCode,
        data: {
          phone: data.phone,
          graphCode: data.graphCode,
          verificationCodeType: 6,
          isajax: true
        },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        state.inviteDetails = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '')
        reject(error)
      })
    })
  },
  /**
   * 检验短信验证码是否正确
   *
   * @param phone                手机号码
   * @param verificationCodeType 验证码类型：1：注册 , 2：找回登陆密码(参数类型为字符串)
   * @param verificationCode     短信验证码
   * @param tokenFlag            令牌需求标识0-不需求1-需求，默认为1
   * @param certificateType      凭证类型0-验证码1-令牌，默认为0
   * @return
   */
  validateSmsCode ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/validateSmsCode',
        data: {
          phone: data.phone,
          verificationCode: data.verificationCode,
          verificationCodeType: 6,
          tokenFlag: 1,
          certificateType: 0
        }
      }).then(res => {
        state.inviteDetails = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '')
        reject(error)
      })
    })
  },
  /**
   * 获取登录ticket
   */
  getLoginTicket ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/portal/outward/getLoginTicket',
        params: {
          appId: 'FI0001'
        },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        state.inviteDetails = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '')
        reject(error)
      })
    })
  },
  /**
   * 获取短信验证码
   */
  loginRemote ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/sendSmsCode',
        data: {
          cellphone: data.phone,
          phoneVeriCode: data.checkCode,
          lt: data.ticket,
          verificationCodeType: 6,
          appId: 'FI0001',
          loginModeType: 2,
          target: 'none',
          isajax: true
        },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        state.inviteDetails = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '')
        reject(error)
      })
    })
  },
  /* GET /v/inviteFriend/details 查询用户邀请的好友详情 */
  getInviteDetails ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios.get('/api/v2/fworker/rest/v/inviteFriend/details', {
        params: data // 请求参数
      }).then(res => {
        state.inviteDetails = res.data
        resolve()
      }).catch(error => {
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
