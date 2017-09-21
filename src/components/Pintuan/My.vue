<template>
  <div>
    <div class="qr-row">
      <img class="img" src="../../../static/pintuan/qr-row@2x.png" alt="公众号二维码">
    </div>
    <!-- <tab>
      <tab-item selected>全部拼团</tab-item>
      <tab-item disabled></tab-item>
      <tab-item disabled></tab-item>
    </tab> -->
    <div class="list-row" v-for="order in pintuanMyGroup" :key="order.actEntityId">
      <div class="order-info">{{ getStatusName(order.allStatus) }}</div>
      <div class="order-title vux-1px-t vux-1px-b">
        <flexbox>
          <flexbox-item :span="1/4" class="order-logo-box">
            <img src="../../../static/pintuan/order-logo@2x.png" alt="商品图标" class="order-logo">
          </flexbox-item>
          <flexbox-item :span="3/4">
            <div class="title-text">
              <div class="product-text">
                <span>{{ order.productName }}</span>
              </div>
              <div class="price">
                实际支付：
                <span class="number">{{ Number(order.saleAmout) / 100 }}</span>
                元
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="order-bottom">
        <flexbox>
          <flexbox-item>
            <!-- <div class="action-info">
              15分钟未付款的订单将自动关闭
            </div> -->
          </flexbox-item>
          <flexbox-item :span="3/10" class="btn-wrapper">
            <x-button mini plain type="primary" class="btn" action-type="button" @click.native="clickBtn(order)">{{ getStatusBtnName(order.allStatus) }}</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <!-- <div class="list-row">
      <div class="order-info">未付款</div>
      <div class="order-title vux-1px-t vux-1px-b">
        <flexbox>
          <flexbox-item :span="1/4" class="order-logo-box">
            <img src="../../../static/pintuan/order-logo@2x.png" alt="商品图标" class="order-logo">
          </flexbox-item>
          <flexbox-item :span="3/4">
            <div class="title-text">
              <div class="product-text">
                <span>{{carTypeName}}</span>
                <span v-if="carInner" class="product-inner"> + 内饰清洗</span>
              </div>
              <div class="price">
                实际支付：
                <span class="number">20.00</span>
                元
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="order-bottom">
        <flexbox>
          <flexbox-item>
            <div class="action-info">
              拼团剩余时间：
              <clocker time="2017-09-21" format="%H : %M : %S">
              </clocker>
            </div>
          </flexbox-item>
          <flexbox-item :span="3/10" class="btn-wrapper">
            <x-button mini plain type="primary" class="btn" action-type="button">去支付</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import sha1 from 'crypto-js/sha1'
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton,
  querystring
} from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Clocker,
    XButton
  },
  data () {
    return {
      statusNames: ['拼团失败', '拼团成功', '未付款', '已付款 拼团中', '已失效'],
      statusBtnNames: ['再次拼团', '立即使用', '去支付', '邀请好友', '重新拼团']
    }
  },
  computed: {
    ...mapState([
      'pintuanMyGroup'
    ])
  },
  methods: {
    ...mapActions([
      'getPintuanMyGroups',
      'isLogin',
      'getWxTicket',
      'getWxOpenId',
      'h5pay'
    ]),
    getStatusName (status) {
      return this.statusNames[status]
    },
    getStatusBtnName (status) {
      return this.statusBtnNames[status]
    },
    clickBtn (order) {
      console.log(order)
      const z = this
      if (order.allStatus === '0') { // 再次拼团
        z.$router.push({
          name: 'PintuanProduct'
        })
      } else if (order.allStatus === '1') { // 立即使用
        console.log('立即使用')
        // z.$router.push({
        //   name: 'PintuanProduct'
        // })
      } else if (order.allStatus === '2') { // 去支付
        z.createPay(order.orderId)
      } else if (order.allStatus === '3') { // 邀请好友
        console.log('邀请好友')
      } else if (order.allStatus === '4') { // 重新拼团
        z.$router.push({
          name: 'PintuanProduct'
        })
      }
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
        console.log(obj)
        z.$wechat.chooseWXPay({
          timestamp: obj.weiXinPayOutputDTO.timeStamp,
          nonceStr: obj.weiXinPayOutputDTO.nonceStr,
          package: obj.weiXinPayOutputDTO.wxPackage,
          signType: obj.weiXinPayOutputDTO.signType,
          paySign: obj.weiXinPayOutputDTO.paySign,
          success: function (res) {
            // 支付成功
            console.log(res)
            this.$router.push({
              name: 'PintuanMy'
            })
          }
        })
      })
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
        let isMicroMessenger = navigator.userAgent.toLowerCase().indexOf('MicroMessenger'.toLowerCase()) > -1
        if (isMicroMessenger && !querystring.parse().code) {
          let redirUri = encodeURIComponent(window.location.href)
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + z.appId + '&redirect_uri=' + redirUri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
        } else {
          z.initWxConfig()
        }
        console.log(t)
      }).catch(function () {
        // 清除失效的微信code
        location.search = ''
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
    z.isLogin().then(function (status) {
      if (!status) {
        z.$router.push({
          name: 'PintuanProduct'
        })
      }
    })
    z.getPintuanMyGroups({
      // status: 1
    })
  },
  mounted () {
    const z = this
    z.initWxTicket()
    let code = querystring.parse().code
    if (code) {
      z.getWxOpenId({
        code: code
      }).then(function (openId) {
        z.openId = openId
      })
    } else {

    }
  }
}
</script>
<style lang="less" scoped>
.qr-row {
  .img {
    width: 100%;
  }
}
.list-row {
  .order-info {
    padding: 0.5em 1em;
  }
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
        .number {
          color: @theme-color;
        }
      }
    }
  }
  .order-bottom {
    padding: 1em;
    border-bottom: 0.5em solid #f2f2f2;
    .btn-wrapper {
      text-align: right;
    }
    .btn {
      color: @theme-color;
      border-color: @theme-color;
    }
  }
}
</style>
