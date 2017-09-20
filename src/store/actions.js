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
        // data: {
        //   phone: data.phone,
        //   graphCode: data.graphCode,
        //   verificationCodeType: 6,
        //   isajax: true
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res)
        resolve(res.status)
      }).catch(error => {
        oneError(commit, state, error, '发送短信验证码')
        reject(error)
      })
    })
  },
  smsLogin ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      smsLogin(commit, state, data).then(function (status) {
        resolve(status)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/queryAllgroup
   * 查询所有的拼团信息
   * @param status 拼团状态
   */
  getPintuanAllGroup ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/queryAllgroup',
        params: data
      }).then(res => {
        console.log(res.data)
        state.pintuanAllGroup = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '查询所有的拼团信息')
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/querydatabyentityid
   * 根据拼团实体ID查询拼团实体数据
   * @param actEntityId 拼团实体ID
   */
  getPintuanDetails ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/querydatabyentityid',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询拼团实体数据')
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/queryproduct
   * 商品下单详情页
   * @param activityId 拼团实体ID
   */
  getPintuanProduct ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/queryproduct',
        params: data
      }).then(res => {
        console.log(res.data)
        state.pintuanProduct = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '拼团商品详情')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/cancelOrder
   * 取消拼团订单
   * @param orderId 拼团订单ID
   */
  cancelPintuanOrder ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/cancelOrder',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '取消拼团订单')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/queryMygroup
   * 查询我的拼团信息
   * @param status 拼团状态
   */
  getPintuanMyGroups ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/queryMygroup',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询我的拼团信息')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/queryexist
   * 查询是否已经参加当前的拼团
   * @param actEntityId 拼团实体ID
   */
  getPintuanExist ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/queryexist',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '查询是否已经参加当前的拼团')
        reject(error)
      })
    })
  },
  /**
   * POST /v/groupBuyingOrder
   * 拼多多下单
   * @param productId
   * @param productCatalog
   * @param saleAmonut
   * @param introducerId
   * @param actEntityId
   * @param activityId
   */
  orderPintuan ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/groupBuyingOrder',
        data: data
      }).then(res => {
        let orderId = res.data
        console.log(res.data)
        resolve(orderId)
      }).catch(error => {
        oneError(commit, state, error, '拼团下单')
        reject(error)
      })
    })
  },
  /**
   * GET /portal/isLogin
   * 判读是否登录
   */
  isLogin ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/portal/isLogin'
      }).then(res => {
        console.log(res.data)
        let status = res.data && res.data.val === 'true'
        resolve(status)
      }).catch(error => {
        oneError(commit, state, error, '登录校验')
        reject(error)
      })
    })
  },
  /**
   * GET /user/rest/wechat/userinfo
   * 获取微信OpenId
   * @param code // 微信url中的code
   */
  getWxOpenId ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/user/rest/wechat/userinfo',
        params: data
      }).then(res => {
        console.log(res.data)
        let openId = res.data.openid
        resolve(openId)
      }).catch(error => {
        oneError(commit, state, error, '获取微信OpenId')
        reject(error)
      })
    })
  },
  /**
   * GET /user/rest/wechat/ticket
   * 获取微信支付Ticket
   */
  getWxTicket ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/user/rest/wechat/ticket'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '获取微信支付Ticket')
        reject(error)
      })
    })
  },
  /**
   * POST /fuser/rest/a/h5pay
   * H5支付
   * @param orderId
   * @param openId
   * @param errorNotifyUrl ''
   * @param redirectUrl ''
   * @param returnUrl ''
   * @param skuId ''
   * @param clientSystemType '3'
   * @param payCodeEnum4H5 '1201'
   * @param paySourceEnum '6'
   */
  h5pay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/a/h5pay',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, 'H5支付')
        reject(error)
      })
    })
  }
}
/**
 * 短信登录函数，包含多个接口
 * data: {
 *  phone,
 *  verificationCode
 * }
 */ 
function smsLogin (commit, state, data) {
  let checkCode
  let ticket
  /**
   * 获取登录ticket
   */
  function getLoginTicket () {
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
        console.log(res.data)
        ticket = res.data && res.data.val
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '获取登录ticket')
        reject(error)
      })
    })
  }
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
  function validateSmsCode () {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/validateSmsCode?verificationCodeType=6&tokenFlag=1&certificateType=0&phone=' + data.phone + '&verificationCode=' + data.verificationCode,
        // data: {
        //   phone: data.phone,
        //   verificationCode: data.verificationCode,
        //   verificationCodeType: 6,
        //   tokenFlag: 1,
        //   certificateType: 0
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res.data)
        checkCode = res.data && res.data.newVerifyCode
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '检验短信验证码')
        reject(error)
      })
    })
  }
  /**
   * 短信验证码登录
   */
  function loginRemote () {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/loginRemote?verificationCodeType=6&appId=FI0001&loginModeType=2&target=none&isajax=true&cellphone=' + data.phone + '&phoneVeriCode=' + checkCode + '&lt=' + ticket,
        // data: {
        //   cellphone: data.phone,
        //   phoneVeriCode: checkCode,
        //   lt: ticket,
        //   verificationCodeType: 6,
        //   appId: 'FI0001',
        //   loginModeType: 2,
        //   target: 'none',
        //   isajax: true
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res.data)
        resolve(res.status)
      }).catch(error => {
        oneError(commit, state, error, '短信验证码登录')
        reject(error)
      })
    })
  }
  return new Promise(function (resolve, reject) {
    validateSmsCode().then(function () {
      getLoginTicket().then(function () {
        loginRemote().then(function (status) {
          resolve(status)
        })
      })
    })
  })
}
// 通用的错误处理
function oneError (commit, state, error, name) {
  console.dir(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    let errorText = name + '失败：' + (error.response.data && error.response.data.message) || '回应失败'
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    let errorText = name + '失败：请求失败'
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    let errorText = name + '失败：' + error.message
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
  }
}
