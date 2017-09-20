<template>
  <div class="order-box">
    <div class="order-title">
      <flexbox>
        <flexbox-item :span="1/4" class="order-logo-box">
          <img src="../../../static/pintuan/order-logo@2x.png" alt="商品图标" class="order-logo">
        </flexbox-item>
        <flexbox-item :span="3/4">
          <div class="title-text">
            <div class="product-text">
              <span>{{ orderInfo.title }}</span>
            </div>
            <div class="price">
              单买价：
              <span class="number">{{ orderInfo.salePrice }}</span>
              元
            </div>
            <div class="price">
              3人团价：
              <span class="number">{{ orderInfo.dicountPrice }}</span>
              元
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <group v-if="!isUserLogin" labelWidth="4em" gutter="0">
      <x-input name="mobile" title="" class="login-input" placeholder="请输入手机号码" keyboard="number" :show-clear="false" v-model="phone" is-type="china-mobile" ref="phone"></x-input>
      <x-input name="graphCode" title="" class="login-input" placeholder="请输入图形验证码" keyboard="number" :show-clear="false" v-model="graphCode" :min="4" :max="4" ref="graphCode">
        <x-button slot="right" type="primary" class="graphcode" :style="{backgroundImage: 'url(' + graphCodeUrl + ')'}" title="刷新图形验证码" mini @click.native="getGraphCode">获取图形验证码</x-button>
      </x-input>
      <x-input name="verifyCode" title="" class="login-input" placeholder="请输入短信验证码" keyboard="number" v-model="verifyCode" :show-clear="false" :min="4" :max="4" ref="verifyCode">
        <x-button slot="right" type="primary" mini @click.native="getSmsCode" :disabled="disableGraphCode">
          <countdown v-if="disableGraphCode" @on-finish="disableGraphCode = false" :value="60"></countdown>
          <span v-if="disableGraphCode">秒</span>
          <span v-if="!disableGraphCode">获取验证码</span>
        </x-button>
      </x-input>
    </group>
    <group labelWidth="4em" labelAlign="left" gutter="0.5em">
      <x-input title="城市" disabled v-model="orderInfo.cityName"></x-input>
    </group>
    <group labelWidth="4em" labelAlign="left" gutter="0.5em">
      <x-input title="购买须知" disabled></x-input>
      <cell>
        <div slot="inline-desc" class="buy-tips">
          拼团成功后可直接使用
          <br/>
          拼团失败则30分钟内自动退款
        </div>
      </cell>
    </group>
    <group labelWidth="4em" labelAlign="left" gutter="0.5em">
      <x-input title="支付方式" disabled></x-input>
      <cell title="微信支付" class="pay-way">
        <img src="../../../static/pintuan/wechat-pay@2x.png" slot="icon" class="wechat-pay-icon" alt="微信支付图标">
        <x-icon type="ios-checkmark-empty" class="cell-icon-check"></x-icon>
      </cell>
    </group>
    <div class="bottombar-push"></div>
    <flexbox class="bottombar">
      <flexbox-item class="bottombar-item">
        <div class="total-price">
          总价：
          <span class="price">
            &#165;
            <span class="number">{{ orderInfo.orderPrice }}</span>
          </span>
        </div>
      </flexbox-item>
      <flexbox-item class="bottombar-item" :span="3/8">
        <a href="javascript:void(0);" class="btn-pintuan" @click="payBtn">
          去支付
        </a>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import sha1 from 'crypto-js/sha1'
import {
  Flexbox,
  FlexboxItem,
  Group,
  Cell,
  XInput,
  XButton,
  Countdown,
  querystring
} from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    XInput,
    XButton,
    Countdown
  },
  data () {
    return {
      orderInfo: {},
      openId: '',
      appId: '',
      ticket: '',
      payLoading: false,
      phone: '',
      graphCode: '',
      verifyCode: '',
      graphCodeUrl: '/api/v3/portal/outward/getGraphCode',
      disableGraphCode: false,
      isUserLogin: false
    }
  },
  computed: {
    ...mapState([
      // 'orderInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'showToast',
      'showLoading',
      'hideLoading'
    ]),
    ...mapActions([
      'sendSmsCode',
      'smsLogin',
      'orderPintuan',
      'isLogin',
      'getWxTicket',
      'getWxOpenId',
      'h5pay'
    ]),
    getGraphCode () {
      this.graphCodeUrl = '/api/v3/portal/outward/getGraphCode?time=' + Number(new Date())
    },
    getSmsCode () {
      const z = this
      if (!(z.phone && z.$refs.phone.valid)) {
        z.showToast({
          type: 'warn',
          text: '请输入正确的手机号'
        })
      } else if (!(z.graphCode && z.$refs.graphCode.valid)) {
        z.showToast({
          type: 'warn',
          text: '请输入图形验证码'
        })
      } else {
        z.sendSmsCode({
          phone: z.phone,
          graphCode: z.graphCode
        }).then(function (status) {
          z.showToast({
            type: 'success',
            text: '短信验证码已发送'
          })
          if (status === 200) {
            z.disableGraphCode = true
          }
        })
      }
    },
    doLogin () {
      const z = this
      if (!(z.phone && z.$refs.phone.valid)) {
        z.showToast({
          type: 'warn',
          text: '请输入正确的手机号'
        })
      } else if (!(z.graphCode && z.$refs.graphCode.valid)) {
        z.showToast({
          type: 'warn',
          text: '请输入图形验证码'
        })
      } else if (!(z.verifyCode && z.$refs.verifyCode.valid)) {
        z.showToast({
          type: 'warn',
          text: '请输入短信验证码'
        })
      } else if (!z.payLoading) {
        let data = {
          phone: z.phone,
          verificationCode: z.verifyCode
        }
        z.showLoading({
          text: ''
        })
        z.payLoading = true
        z.smsLogin(data).then(function (status) {
          z.hideLoading()
          if (status === 200) {
            z.payLoading = false
            z.createOrder()
          }
        })
      }
    },
    createOrder () {
      const z = this
      z.orderPintuan({
        productId: '',
        productCatalog: z.orderInfo.categoryId.toString(),
        saleAmonut: z.orderInfo.salePrice * 100,
        introducerId: '',
        actEntityId: '',
        activityId: 1
      }).then(function (orderId) {
        z.createPay(orderId)
      })
    },
    createPay (orderId) {
      const z = this
      console.log(orderId)
      let payData = {
        orderId: orderId,
        openId: z.openId,
        errorNotifyUrl: '',
        redirectUrl: '',
        returnUrl: '',
        skuId: '',
        clientSystemType: '3',
        payCodeEnum4H5: '1201',
        paySourceEnum: '6'
      }
      z.h5pay(payData).then(function (obj) {
        z.$wechat.chooseWXPay({
          timestamp: obj.weiXinPayOutputDTO.timeStamp,
          nonceStr: obj.weiXinPayOutputDTO.nonceStr,
          package: obj.weiXinPayOutputDTO.wxPackage,
          signType: 'MD5',
          paySign: obj.weiXinPayOutputDTO.paySign,
          success: function (res) {
            // 支付成功
            console.log(res)
          }
        })
      })
    },
    payBtn () {
      const z = this
      if (z.isUserLogin) {
        z.createOrder()
      } else {
        z.doLogin()
      }
    },
    randomStr (len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl, 9gq, Vv, Uu, I1
      let maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    initWxTicket () {
      const z = this
      z.getWxTicket().then(function (t) {
        z.appId = t.appid
        z.ticket = t.ticket
        console.dir(querystring.parse())
        let isMicroMessenger = navigator.userAgent.toLowerCase().indexOf('MicroMessenger'.toLowerCase()) > -1
        if (isMicroMessenger && !querystring.parse().code) {
          let redirUri = encodeURIComponent(window.location.href)
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + z.appId + '&redirect_uri=' + redirUri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        } else {
          z.initWxConfig()
        }
        console.log(t)
      })
    },
    initWxConfig () {
      const z = this
      let noncestr = z.randomStr(16)
      let timestamp = new Date().getTime().toString().substr(0, 10)
      let url = decodeURIComponent(location.href).split('#')[0]
      let signStr = 'jsapi_ticket=' + z.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url
      let signature = sha1(signStr).toString()
      z.$wechat.config({
        debug: true, // 开发者工具显示详情
        appId: z.appId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          'chooseWXPay'
        ]
      })
      z.$wechat.error(function (res) {
        console.log(res)
        z.showToast({
          type: 'warn',
          text: '微信权限验证配置失败'
        })
      })
    }
  },
  created () {
    const z = this
    let pintuanOrderInfo = sessionStorage.getItem('pintuanOrderInfo')
    if (pintuanOrderInfo) {
      z.orderInfo = JSON.parse(pintuanOrderInfo)
    } else {
      // z.$router.push({
      //   name: 'PintuanProduct'
      // })
    }
    z.isLogin().then(function (status) {
      z.isUserLogin = status
    })
  },
  mounted () {
    const z = this
    console.log(this.orderInfo)
    z.initWxTicket()
    let code = querystring.parse().code
    if (code) {
      z.getWxOpenId({
        code: code
      }).then(function (openId) {
        z.openId = openId
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order-box {
  min-height: 100vh;
  background-color: #f2f2f2;
  .order-title {
    padding: 1em;
    .order-logo-box {
      align-self: flex-start;
      padding-top: 0.375em;
      .order-logo {
        display: inline-block;
        width: 100%;
      }
    }
    .title-text {
      display: inline-block;
      .product-text {
        font-size: 1.375rem;
        font-weight: bold;
      }
      .price {
        color: #666;
      }
    }
  }
  .graphcode {
    display: inline-block;
    width: 5em;
    height: 2em;
    background-size: 10em;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0;
    color: transparent;
    background-color: transparent;
  }
  .graphcode:active {
    border-radius: 0;
    color: transparent;
    background-color: transparent;
  }
  .buy-tips {
    text-align: left;
    font-size: 0.875rem;
    color: #666;
  }
  .wechat-pay-icon {
    width: 2em;
    margin-right: 1em;
  }
  .pay-way {
    font-size: 0.875rem;
  }
  .cell-icon-check {
    width: 3em;
    height: 3em;
  }
  .bottombar-push {
    height: 4em;
  }
  .bottombar {
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #fff;
    .bottombar-item {
      margin: 0 !important;
    }
    .total-price {
      text-align: right;
      margin-right: 1em;
      .price {
        font-size: 1.5rem;
        color: @theme-color;
      }
    }
    .btn-pintuan {
      display: block;
      padding: 1em 0;
      color: #fff;
      background-color: @theme-color;
    }
  }
}
</style>
