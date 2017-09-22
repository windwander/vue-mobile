<template>
  <div>
    <swiper :aspect-ratio="562/750">
      <swiper-item class="swiper-img" v-for="(item, index) in swiper" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
    <div class="title-box vux-1px-b">
      <div class="title-row">
        <span class="title-badge">上门洗车</span>
        拥有三项自主专利  温和去污不伤漆  超柔洁净不留痕  专业技师55道工序  对比有水洗车更干净
      </div>
      <div class="price-row">
        <span class="price-low">
          <!-- &#165; -->
          <span class="number">{{ discountLowPrice }}</span>
          元起
        </span>
        <!-- <span class="sale-amount">
          已售
          <span class="number">1000</span>
          份
        </span> -->
      </div>
      <div v-if="actEntityId && group.entityTimeOut" class="pintuan-all">
        <span v-if="group.groupNowMember < group.groupRequireMember">想买了？可直接参与下面的团</span>
        <span v-else>&nbsp;</span>
        <router-link :to="{ name: 'PintuanListHa' }" class="link">全部拼团></router-link>
      </div>
    </div>
    <div v-if="actEntityId && group.entityTimeOut" class="invite-row">
      <flexbox>
        <flexbox-item v-if="group.groupNowMember < group.groupRequireMember" :span="2/5" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">{{ group.groupRequireMember - group.groupNowMember }}</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker :time="formatDate(group.startDateTime, group.entityTimeOut)" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item :class="{'inner-center': group.groupNowMember >= group.groupRequireMember}">
          <img class="avatar" v-for="(url, index) in group.picturl" :key="index" :src="url || '~static/pintuan/avatar-default@2x.png'" alt="用户头像'" />
        </flexbox-item>
        <flexbox-item :class="{'inner-center': group.groupNowMember >= group.groupRequireMember}">
          <x-button v-if="group.groupNowMember >= group.groupRequireMember" mini plain type="warn" disabled action-type="button">团购完成</x-button>
          <x-button v-else-if="group.isjoin === '0'" mini plain type="primary" class="btn" action-type="button" @click.native="clickJoin(group)">直接参团</x-button>
          <x-button v-else mini plain type="primary" class="btn" action-type="button" @click.native="showShareBox = true">邀请好友</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- <div v-if="actEntityId && group.entityTimeOut" class="direct-join-row">
      <div class="order-title vux-1px-b">
        <flexbox>
          <flexbox-item :span="1/4" class="order-logo-box">
            <img src="~static/pintuan/order-logo@2x.png" alt="商品图标" class="order-logo">
          </flexbox-item>
          <flexbox-item :span="3/4">
            <div class="title-text">
              <div class="product-text">
                <span>{{ orderInfo.title }}</span>
              </div>
              <div class="price">
                单买价：
                <span class="number">20.00</span>
                元
              </div>
              <div class="price">
                3人团价：
                <span class="number">20.00</span>
                元
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="group-info">
        <div class="avatar-row">
          <img class="avatar" src="/static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="/static/pintuan/avatar-default@2x.png" alt="用户头像" />
        </div>
        <div class="remain-people">
          还差
          <span class="number">1</span>
          人即可组团成功，
          <clocker time="2017-09-21" format="%H : %M : %S">
          </clocker>
          后结束
        </div>
        <x-button type="primary" class="btn" action-type="button" >直接参团</x-button>
      </div>
    </div> -->
    <div class="qr-row">
      <img class="img" src="~static/pintuan/qr-row-ha@2x.png" alt="公众号二维码">
    </div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onTabClick">商品详情</tab-item>
      <tab-item @on-item-click="onTabClick">用户评价</tab-item>
      <tab-item @on-item-click="onTabClick">玩法介绍</tab-item>
    </tab>
    <div v-if="tabIndex === 0">
      <video src="~static/product/carwash/1.mp4" controls preload="metadata" poster="~static/product/carwash/1.png" width="100%"></video>
      <x-img v-for="n in 11" :key="n" default-src="~static/placeholder.png" :src="'static/product/carwash/' + (n + 1) + '.png'" class="ximg" error-class="ximg-error" :offset="100" ></x-img>
    </div>
    <ul v-if="tabIndex === 1" class="user-comment">
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-16@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">非常干净，一直相信慧驾的服务</p>
        <x-img default-src="~static/placeholder.png" src="~static/pintuan/review/group-17@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-18@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">一早就预约好的，很快就洗好了，不错</p>
        <x-img default-src="~static/placeholder.png" src="~static/pintuan/review/group-19@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-20@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">服务非常好，还帮我修复了车身痕迹，赞一个。</p>
        <x-img default-src="~static/placeholder.png" src="~static/pintuan/review/group-21@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-22@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">车洗的很干净，态度很好，速度很快！</p>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-23@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">超赞，清洗很干净，最主要节约用水</p>
        <x-img default-src="~static/placeholder.png" src="~static/pintuan/review/group-24@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="~static/pintuan/review/group-25@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
            <img src="~static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">洗的非常非常干净，下次还会用</p>
      </li>
    </ul>
    <div v-if="tabIndex === 2" class="play-introduce">
      <div class="play-ximg">
        <x-img default-src="~static/pintuan/rule-top@2x.png" src="~static/pintuan/rule-top@2x.png" class="ximg" error-class="ximg-error" :offset="100"></x-img>
      </div>
      <div class="play-content">
        <ol>
          <li>此拼团活动新老客户均可参与，3人即可成团；</li>
          <li>用户可加入其它客户一起拼团，也可自己单独开团；</li>
          <li>若24小时内支付人数达到成团人数则拼团成功，自动发送计次卡至您的慧驾账户；否则团失败，自动退款至微信钱包；</li>
          <li>拼团成功后，对应服务的计次卡将发放到您的账户中，您可以需要服务时，凭手机号登录慧驾微信公众号或者慧驾APP下单，服务完成选择计次卡支付。</li>
        </ol>
      </div>
      <div class="play-copy">拼团活动解释权归南京联创慧驾汽车服务有限公司所有。</div>
    </div>
    <div class="bottombar-push"></div>
    <flexbox class="bottombar">
      <flexbox-item class="bottombar-item">
        <a href="javascript:void(0);" class="btn-my" @click="clickMyBtn">
          <img slot="icon" src="~static/pintuan/my-icon@2x.png" class="my-icon"><br/>
          我的拼团
        </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
      <a href="http://m.huijiacar.com/wlwc/" class="btn-single">
        {{ saleLowPrice }}元起<br/>单独购买
      </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
        <a href="javascript:void(0);" class="btn-pintuan" @click="clickOrderPopupButton(true, false)">
          {{ discountLowPrice }}元起<br/>3人拼团
        </a>
      </flexbox-item>
    </flexbox>
    <popup v-model="showOrderPopup" @on-hide="orderPopupHide" @on-show="orderPopupShow" class="popup-box">
      <div class="popup-order">
        <div class="title vux-1px-b">
          <img src="~static/pintuan/order-logo@2x.png" alt="下单订单logo" class="title-logo">
          <div class="title-text">
            <span class="price">
              &#165;
              <span class="number">{{ orderInfo.orderPrice }}</span>
            </span>
            <br/>
            <span class="product-text">
              <span>{{ orderInfo.title }}</span>
            </span>
          </div>
        </div>
        <div class="row-pad vux-1px-b">
          选择城市
        </div>
        <div class="row-pad vux-1px-b">
          <x-button v-for="c in cities" :key="c.cityCode" mini plain class="btn" action-type="button" :class="{selected: city.cityCode === c.cityCode}" @click.native="setCity(c)">{{ c.cityName }}</x-button>
        </div>
        <div class="row-pad vux-1px-b">
          选择车型
        </div>
        <div class="car-type vux-1px-b">
          <flexbox>
            <flexbox-item>
              <div class="car-btn car5" :class="{selected: carType === '五座轿车'}" @click="setCarType('五座轿车')">
                五座小轿车
              </div>
            </flexbox-item>
            <flexbox-item class="vux-1px-l vux-1px-r margin-0">
              <div class="car-btn suv5" :class="{selected: carType === '五座SUV'}" @click="setCarType('五座SUV')">
                五座SUV
              </div>
            </flexbox-item>
            <flexbox-item class=" margin-0">
              <div class="car-btn suv7" :class="{selected: carType === '七座商务'}" @click="setCarType('七座商务')">
                七座商务SUV
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="row-pad vux-1px-b">
          附加服务
        </div>
        <div class="row-pad vux-1px-b">
          <x-button mini plain class="btn" :class="{selected: carInner}" @click.native="setCarInner">内饰清洗</x-button>
        </div>
        <div class="row-pad">
          <x-button type="primary" class="btn-submit" action-type="button" @click.native="submit">确定</x-button>
        </div>
      </div>
    </popup>
    <confirm v-model="loginDialog" title="登录" :confirm-text="loginLoading ? '登陆中……' : '登录'" class="dialog-login" :close-on-confirm="false" @on-confirm="doLogin">
      <div slot="default" class="dialog-login-body">
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
      </div>
    </confirm>
    <confirm v-model="showExistOrder" title="您存在未支付拼团" confirm-text="去支付" cancel-text="取消订单" class="dialog-exist-order" :close-on-confirm="false" @on-confirm="payExistOrder(existOrder.orderId)" @on-cancel="cancelExistOrder(existOrder.orderId)">
      <div slot="default" class="dialog-exist-order-body">
        {{ existOrder.productName }}
      </div>
    </confirm>
    <x-dialog v-model="showShareBox" class="dialog-share" hide-on-blur @on-hide="hideShareBox" :dialog-style="{width: '100%', maxWidth: '100%', backgroundColor: 'transparent', marginTop: '-40%'}">
      <div class="img-box" @click="showShareBox = false"></div>
    </x-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import sha1 from 'crypto-js/sha1'
import {
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton,
  Tab,
  TabItem,
  XImg,
  Tabbar,
  TabbarItem,
  Popup,
  Confirm,
  XInput,
  Countdown,
  XDialog,
  dateFormat,
  querystring
} from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Clocker,
    XButton,
    Tab,
    TabItem,
    XImg,
    Tabbar,
    TabbarItem,
    Popup,
    Confirm,
    XInput,
    Countdown,
    XDialog
  },
  data () {
    return {
      swiper: [
        '~static/pintuan/banner-1.jpg',
        '~static/pintuan/banner-2.jpg',
        '~static/pintuan/banner-3.jpg'
      ],
      tabIndex: 0,
      showOrderPopup: false,
      city: {
        cityCode: 0,
        cityName: ''
      },
      carType: '五座轿车',
      // carTypeNames: ['五座SUV', '五座轿车', '七座商务'],
      carInner: false,
      buyDiscount: false,
      isJoin: false,
      orderPrice: '',
      orderInfo: {
        title: '五座轿车',
        categoryId: [],
        orderPrice: 0,
        dicountPrice: 0,
        salePrice: 0
      },
      loginDialog: false,
      loginLoading: false,
      phone: '',
      graphCode: '',
      verifyCode: '',
      graphCodeUrl: '/api/v3/portal/outward/getGraphCode',
      disableGraphCode: false,
      actEntityId: '',
      group: {},
      isUserLogin: false,
      showShareBox: false,
      existOrder: {},
      showExistOrder: false,
      appId: '',
      ticket: ''
    }
  },
  computed: {
    ...mapState([
      'pintuanProduct'
    ]),
    saleLowPrice: function () {
      return this.pintuanProduct.saleLowPrice && (this.pintuanProduct.saleLowPrice / 100)
    },
    discountLowPrice: function () {
      return this.pintuanProduct.discountLowPrice && (this.pintuanProduct.discountLowPrice / 100)
    },
    cities: function () {
      let c = []
      this.pintuanProduct.productList && this.pintuanProduct.productList.map(function (el) {
        c.push({
          cityCode: el.cityCode,
          cityName: el.cityName
        })
      })
      return c
    }
  },
  watch: {
  },
  methods: {
    ...mapMutations([
      'showToast',
      'showLoading',
      'hideLoading',
      'setOrderInfo'
    ]),
    ...mapActions([
      'sendSmsCode',
      'smsLogin',
      'getPintuanProduct',
      'getPintuanDetails',
      'getPintuanExist',
      'cancelPintuanOrder',
      'getWxTicket',
      'getWxOpenId',
      'isLogin'
    ]),
    onTabClick: function (index) {
      this.tabIndex = index
      console.log(index)
    },
    orderPopupShow (e) {
      console.log(e)
      console.log('orderPopupShow')
    },
    orderPopupHide (e) {
      console.log(e)
      console.log('orderPopupHide')
    },
    clickOrderPopupButton (isDiscount, isJoin) {
      this.showOrderPopup = true
      this.buyDiscount = isDiscount
      this.isJoin = isJoin
      this.computeOrderPrice()
    },
    setCity (city) {
      this.city = city
      this.computeOrderPrice()
    },
    setCarType (type) {
      this.carType = type
      this.computeOrderPrice()
    },
    setCarInner () {
      this.carInner = !this.carInner
      this.computeOrderPrice()
    },
    computeOrderPrice () {
      const z = this
      let dicountPrice = 0
      let salePrice = 0
      if (z.city.cityCode !== 0) {
        z.pintuanProduct.productList && z.pintuanProduct.productList.map(function (el) {
          if (z.city.cityCode === el.cityCode) {
            el.categoryList.map(function (p) {
              if (p.categoryName === z.carType) {
                salePrice = p.salePrice
                dicountPrice = p.dicountPrice
                z.orderInfo.title = z.carType
                z.orderInfo.categoryId = [p.categoryid]
              }
              if (z.carInner && !p.main) {
                salePrice += p.salePrice
                dicountPrice += p.dicountPrice
                z.orderInfo.title += ' + 内饰清洗'
                z.orderInfo.categoryId.push(p.categoryid)
              }
            })
          }
        })
      }
      z.orderInfo.salePrice = salePrice / 100
      z.orderInfo.dicountPrice = dicountPrice / 100
      z.orderInfo.orderPrice = z.buyDiscount ? z.orderInfo.dicountPrice : z.orderInfo.salePrice
    },
    submit () {
      const z = this
      if (z.city.cityCode === 0) {
        z.showToast({
          type: 'warn',
          text: '请选择城市'
        })
      } else {
        let allOrderInfo = Object.assign({}, z.orderInfo, z.city)
        if (z.actEntityId && z.isJoin) {
          allOrderInfo.actEntityId = z.actEntityId
        }
        sessionStorage.setItem('pintuanOrderInfo', JSON.stringify(allOrderInfo))
        z.setOrderInfo()
        z.$router.push({
          name: 'PintuanOrderHa',
          query: z.$router.query
        })
      }
      console.log('submit')
    },
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
      } else if (!z.loginLoading) {
        let data = {
          phone: z.phone,
          verificationCode: z.verifyCode
        }
        z.showLoading({
          text: '登陆中……'
        })
        z.loginLoading = true
        z.smsLogin(data).then(function (status) {
          z.hideLoading()
          if (status === 200) {
            z.loginDialog = false
            z.loginLoading = false
            z.$router.push({
              name: 'PintuanMyHa'
            })
          }
        })
      }
    },
    clickJoin (group) {
      this.clickOrderPopupButton(true, true)
      console.log(group)
    },
    formatDate (startDateTime, entityTimeOut) {
      const endTime = startDateTime + entityTimeOut * 60 * 60 * 1000
      return dateFormat(endTime, 'YYYY-MM-DD HH:mm:ss')
    },
    clickMyBtn () {
      if (this.isUserLogin) {
        this.$router.push({
          name: 'PintuanMyHa'
        })
      } else {
        this.loginDialog = true
      }
    },
    payExistOrder (orderId) {
      window.location.href = 'http://m.huijiacar.com/wlwc/wx-pay.html?orderId=' + orderId + '&wxpayReturnUri=' + encodeURIComponent('https://m.huijiacar.com/vue-mobile/#/pintuan-ha/my')
    },
    cancelExistOrder (orderId) {
      const z = this
      z.cancelPintuanOrder({
        orderId: orderId
      }).then(function () {
        z.showToast({
          type: 'success',
          text: '该订单已取消'
        })
        z.existOrder = {}
      })
    },
    checkExistOrder () {
      const z = this
      z.getPintuanExist({
        actEntityId: z.actEntityId
      }).then(function (data) {
        z.existOrder = data
        if (data.orderId) {
          z.showExistOrder = true
        }
      })
    },
    hideShareBox () {
      sessionStorage.removeItem('showShareBox')
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
        // location.search = ''
      })
    },
    initWxConfig () {
      console.log(this.$route)
      const z = this
      let noncestr = z.randomStr(16)
      let timestamp = new Date().getTime().toString().substr(0, 10)
      let url = decodeURIComponent(location.href).split('#')[0]
      let signStr = 'jsapi_ticket=' + z.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url
      let signature = sha1(signStr).toString()
      z.$wechat.config({
        debug: false, // 开发者工具显示详情
        appId: z.appId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
      z.$wechat.error(function (res) {
        console.log(res)
        z.showToast({
          type: 'warn',
          text: '微信权限验证配置失败'
        })
      })
    },
    initShareInfo (actEntityId) {
      const z = this
      const shareConfig = {
        title: '慧驾邀请您参加洗车拼团',
        desc: '上门洗车3人拼团15元起，拥有三项自主专利，温和去污不伤漆，超柔洁净不留痕',
        link: 'https://m.huijiacar.com/vue-mobile/#/pintuan-ha/product?actEntityId=' + actEntityId,
        imgUrl: 'https://m.huijiacar.com/vue-mobile/static/pintuan/share-logo.png',
        success: function () {
        },
        cancel: function () {
        }
      }
      z.$wechat.ready(function () {
        z.$wechat.showMenuItems({
          menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:timeline'
          ]
        })
        z.$wechat.onMenuShareTimeline(shareConfig)
        z.$wechat.onMenuShareAppMessage(shareConfig)
      })
    }
  },
  created () {
    const z = this
    console.log(z.$route)
    z.actEntityId = z.$route.query.actEntityId
    console.log(z.actEntityId)
    z.getPintuanProduct({
      activityId: 2 // 淮安
    })
    if (z.actEntityId) {
      z.getPintuanDetails({
        actEntityId: z.actEntityId
      }).then(function (group) {
        z.group = group
      })
    }
    z.isLogin().then(function (status) {
      z.isUserLogin = status
      if (status && z.actEntityId) {
        z.checkExistOrder()
      }
    })
    if (sessionStorage.getItem('showShareBox') && z.actEntityId) {
      z.showShareBox = true
    }
    z.initWxTicket()
  },
  mounted () {
    const z = this
    if (z.$route.query.autoJoin) {
      z.clickOrderPopupButton(true, true)
    }
    if (z.$route.query.actEntityId) {
      z.initShareInfo(z.actEntityId)
    } else {
      z.$wechat.ready(function () {
        z.$wechat.hideAllNonBaseMenuItem()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-img img {
  width: 100%;
  height: 100%;
}
.title-box {
  padding: 1em;
  .title-row {
    margin-bottom: 1em;
    text-align: justify;
    .title-badge {
      font-size: 0.75rem;
      padding: 0.25em 0.5em;
      border-radius: 0.5em;
      color: #fff;
      background-color: @theme-color;
    }
  }
  .price-row {
    margin-bottom: 1em;
    line-height: 1;
    .price-low {
      font-size: 1.5rem;
      color: @theme-color;
    }
    .sale-amount {
      float: right;
      line-height: 1.5;
      color: @grey-text;
    }
  }
  .pintuan-all {
    font-size: 0.875rem;
    color: @grey-text;
    .link {
      float: right;
      line-height: 1.5;
      color: @grey-text;
    }
  }
}
.invite-row {
  padding: 1em;
  font-size: 0.875rem;
  .remain-people {
    .number {
      font-size: 1rem;
    }
  }
  .avatar {
    width: 3em;
    height: 3em;
    margin-right: -1.5em;
    border-radius: 1.5em;
    box-shadow: 0 0 0.5em 0px #333;
  }
  .btn {
    color: @theme-color;
    border-color: @theme-color;
  }
}
.direct-join-row {
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
  .group-info {
    margin: 1em;
    text-align: center;
    .avatar {
      width: 3em;
      height: 3em;
      margin-right: -1.5em;
      border-radius: 1.5em;
      box-shadow: 0 0 0.5em 0px #333;
    }
    .remain-people {
      font-size: 0.875rem;
      font-weight: bold;
      line-height: 3;
      .number {
        color: @theme-color;
      }
    }
  }
}
.qr-row {
  .img {
    width: 100%;
  }
}
.ximg {
  width: 100%;
}
.user-comment {
  padding: 1em 1.5em;
  margin: 0;
  .comment-row {
    padding: 1em 0;
    margin-bottom: 1em;
    list-style: none;
  }
  .avatar {
    width: 3.2em;
    height: 3.2em;
    float: left;
  }
  .user-info {
    float: left;
    margin: 0.3em 0 0 0.5em;
    .user-phone {
      font-size: 0.875rem;
      font-weight: bold;
      color: #58595b;
    }
    .comment-time {
      font-size: 0.875rem;
      color: @grey-text;
    }
  }
  .star-box {
    text-align: right;
  }
  .star {
    width: 0.8em;
    height: 0.8em;
  }
  .comment-content {
    font-size: 0.875rem;
    color: #000;
    margin: 1em 0 1em;
  }
  .comment-img {
    width: 7.5em;
    height: 5.4em;
  }
}
.play-introduce {
  padding: 1em;
  .play-ximg {
    text-align: center;
    .ximg {
      width: 290px;
    }
  }
  .play-content {
    margin-top: 1em;
    padding-left: 1.6em;
    font-size: 0.875rem;
    color: #333;
  }
  .play-copy {
    font-size: 0.8rem;
    color: @grey-text;
    margin: 3.75rem 0 1.25rem;
    text-align: center;
  }
}
.bottombar-push {
  height: 4em;
}
.bottombar {
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 0.875rem;
  text-align: center;
  background-color: #fff;
  .bottombar-item {
    margin: 0 !important;
  }
  .btn-my {
    display: block;
    color: #58595b;
    .my-icon {
      width: 2em;
    }
  }
  .btn-single {
    display: block;
    padding: 0.72em 0;
    color: #fff;
    background-color: #F3ABA7;
  }
  .btn-pintuan {
    display: block;
    padding: 0.72em 0;
    color: #fff;
    background-color: @theme-color;
  }
}
.popup-box {
  background-color: transparent;
  .popup-order {
    margin-top: 2em;
    background-color: #fff;
    .title {
      padding-bottom: 1em;
      .title-logo {
        display: inline-block;
        width: 6em;
        margin-left: 2em;
        margin-top: -2em;
        border: 5px solid #fff;
        box-shadow: 0 0 10px 0px #000;
      }
      .title-text {
        display: inline-block;
        margin-left: 1em;
        .price {
          font-size: 1.5rem;
          color: @theme-color;
        }
        .product-text {
          font-size: 0.875rem;
          color: @grey-text;
        }
      }
    }
    .row-pad {
      padding: 0.5em 1em;
      .btn {
        font-size: 1em;
        margin-top: 0;
        margin-right: 0.5em;
        border-color: #ccc;
      }
      .btn.selected {
        color: #fff;
        background-color: @theme-color;
      }
    }
    .car-type {
      .car-btn {
        text-align: center;
        padding: 1em 0 3em;
        background-position: center 3em;
        background-repeat: no-repeat;
        background-size: 5em;
      }
      .selected {
        color: #fff;
        background-color: @theme-color;
      }
      .car5 {
        background-image: url(~static/pintuan/car-5.png);
      }
      .car5.selected {
        background-image: url(~static/pintuan/car-5-selected.png);
      }
      .suv5 {
        background-image: url(~static/pintuan/suv-5.png);
      }
      .suv5.selected {
        background-image: url(~static/pintuan/suv-5-selected.png);
      }
      .suv7 {
        background-image: url(~static/pintuan/suv-7.png);
      }
      .suv7.selected {
        background-image: url(~static/pintuan/suv-7-selected.png);
      }
      .margin-0 {
        margin: 0 !important;
      }
    }
    .btn-submit {
      line-height: 3;
    }
  }
}
.dialog-login-body {
  margin: 0 -1.6em;
  line-height: 2;
  .login-input {
    background-color: #f0f0f0;
    border-radius: 0.5em;
    margin: 0 1em 0.5em;
  }
  .login-input::before {
    border: 0;
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
}
.dialog-exist-order {
  .dialog-exist-order-body {
    font-size: 1.25rem;
    color: #333;
    font-weight: bold;
  }
}
.dialog-share {
  .img-box {
    height: 300px;
    background-size: contain;
    background-position: center top;
    background-repeat: no-repeat;
    background-color: transparent;
    background-image: url(~static/pintuan/share@2x.png);
  }
}
.inner-center {
  text-align: center;
}
</style>
