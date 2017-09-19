<template>
  <div>
    <swiper :aspect-ratio="415/750">
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
          &#165;
          <span class="number">20.00</span>
        </span>
        <span class="sale-amount">
          已售
          <span class="number">1000</span>
          份
        </span>
      </div>
      <div class="pintuan-all">
        <span>想买了？可直接参与下面的团</span>
        <a href="#" class="link">全部拼团></a>
      </div>
    </div>
    <div class="invite-row">
      <flexbox>
        <flexbox-item :span="3/10" class="vux-1px-r">
          <div class="remain-people">
            还差
            <span class="number">1</span>
            人
          </div>
          <div class="countdown">
            剩余：
            <clocker time="2017-09-21" format="%H : %M : %S">
            </clocker>
          </div>
        </flexbox-item>
        <flexbox-item>
          <img class="avatar" src="../../../static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="../../../static/pintuan/avatar-default@2x.png" alt="用户头像" />
        </flexbox-item>
        <flexbox-item>
          <x-button mini plain type="primary" class="btn" action-type="button">直接参团</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="direct-join-row">
      <div class="order-title vux-1px-b">
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
          <img class="avatar" src="../../../static/pintuan/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="../../../static/pintuan/avatar-default@2x.png" alt="用户头像" />
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
    </div>
    <div class="qr-row">
      <img class="img" src="../../../static/pintuan/qr-row@2x.png" alt="公众号二维码">
    </div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onTabClick">商品详情</tab-item>
      <tab-item @on-item-click="onTabClick">用户评价</tab-item>
      <tab-item @on-item-click="onTabClick">玩法介绍</tab-item>
    </tab>
    <div v-if="tabIndex === 0">
      <video src="../../../static/product/carwash/1.mp4" controls preload="metadata" poster="../../../static/product/carwash/1.png" width="100%"></video>
      <x-img v-for="n in 11" :key="n" default-src="../../../static/placeholder.png" :src="'static/product/carwash/' + (n + 1) + '.png'" class="ximg" error-class="ximg-error" :offset="100" ></x-img>
    </div>
    <ul v-if="tabIndex === 1" class="user-comment">
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-16@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">非常干净，一直相信慧驾的服务</p>
        <x-img default-src="static/product/placeholder.png" src="../../../static/pintuan/review/group-17@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-18@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">一早就预约好的，很快就洗好了，不错</p>
        <x-img default-src="static/product/placeholder.png" src="../../../static/pintuan/review/group-19@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-20@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">服务非常好，还帮我修复了车身痕迹，赞一个。</p>
        <x-img default-src="static/product/placeholder.png" src="../../../static/pintuan/review/group-21@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-22@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">车洗的很干净，态度很好，速度很快！</p>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-23@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">超赞，清洗很干净，最主要节约用水</p>
        <x-img default-src="static/product/placeholder.png" src="../../../static/pintuan/review/group-24@2x.png" class="ximg comment-img" error-class="ximg-error" :offset="100"></x-img>
      </li>
      <li class="comment-row vux-1px-b">
        <flexbox>
          <flexbox-item :span="3/5">
            <img class="avatar" src="../../../static/pintuan/review/group-25@2x.png" alt="用户头像" />
            <div class="user-info">
              <div class="user-phone">1***7</div>
              <div class="comment-time">2017-09-13</div>
            </div>
          </flexbox-item>
          <flexbox-item class="star-box">
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
            <img src="../../../static/pintuan/star@2x.png" class="star"/>
          </flexbox-item>
        </flexbox>
        <p class="comment-content">洗的非常非常干净，下次还会用</p>
      </li>
    </ul>
    <div v-if="tabIndex === 2" class="play-introduce">
      <div class="play-ximg">
        <x-img default-src="../../../static/pintuan/rule-top@2x.png" src="../../../static/pintuan/rule-top@2x.png" class="ximg" error-class="ximg-error" :offset="100"></x-img>
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
        <a href="javascript:void(0);" class="btn-my" @click="loginDialog = true">
          <img slot="icon" src="../../../static/pintuan/my-icon@2x.png" class="my-icon"><br/>
          我的拼团
        </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
      <a href="javascript:void(0);" class="btn-single" @click="showOrderPopup = true">
        35元起<br/>单独购买
      </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
        <a href="javascript:void(0);" class="btn-pintuan" @click="showOrderPopup = true">
          20元起<br/>3人拼团
        </a>
      </flexbox-item>
    </flexbox>
    <popup v-model="showOrderPopup" @on-hide="orderPopupHide" @on-show="orderPopupShow" class="popup-box">
      <div class="popup-order">
        <div class="title vux-1px-b">
          <img src="../../../static/pintuan/order-logo@2x.png" alt="下单订单logo" class="title-logo">
          <div class="title-text">
            <span class="price">
              &#165;
              <span class="number">20.00</span>
            </span>
            <br/>
            <span class="product-text">
              <span>{{carTypeName}}</span>
              <span v-if="carInner" class="product-inner"> + 内饰清洗</span>
            </span>
          </div>
        </div>
        <div class="row-pad vux-1px-b">
          选择城市
        </div>
        <div class="row-pad vux-1px-b">
          <x-button mini plain class="btn" action-type="button" :class="{selected: city === 320100}" @click.native="setCity(320100)">南京</x-button>
          <x-button mini plain class="btn" action-type="button"  :class="{selected: city === 320200}" @click.native="setCity(320200)">苏州</x-button>
          <x-button mini plain class="btn" action-type="button"  :class="{selected: city === 320300}" @click.native="setCity(320300)">淮安</x-button>
        </div>
        <div class="row-pad vux-1px-b">
          选择车型
        </div>
        <div class="car-type vux-1px-b">
          <flexbox>
            <flexbox-item>
              <div class="car-btn car5" :class="{selected: carType === 'car5'}" @click="setCarType('car5')">
                五座小轿车
              </div>
            </flexbox-item>
            <flexbox-item class="vux-1px-l vux-1px-r margin-0">
              <div class="car-btn suv5" :class="{selected: carType === 'suv5'}" @click="setCarType('suv5')">
                五座SUV
              </div>
            </flexbox-item>
            <flexbox-item class=" margin-0">
              <div class="car-btn suv7" :class="{selected: carType === 'suv7'}" @click="setCarType('suv7')">
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
        <x-input name="mobile" title="" class="login-input" placeholder="请输入手机号码" keyboard="number" :show-clear="false" v-model="phone" is-type="china-mobile" @on-blur="onPhoneBlur" ref="phone"></x-input>
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
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
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
  Countdown
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
    Countdown
  },
  data () {
    return {
      swiper: [
        '../../../static/pintuan/banner@2x.png'
      ],
      tabIndex: 0,
      showOrderPopup: false,
      city: 0,
      carType: 'car5',
      carTypeName: '五座小轿车',
      carInner: false,
      loginDialog: false,
      loginLoading: false,
      phone: '',
      graphCode: '',
      verifyCode: '',
      graphCodeUrl: '/api/v3/portal/outward/getGraphCode',
      disableGraphCode: false
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapMutations([
      'showToast',
      'showLoading',
      'hideLoading'
    ]),
    ...mapActions([
      'sendSmsCode',
      'smsLogin'
    ]),
    onTabClick: function (index) {
      this.tabIndex = index
      console.log(index)
    },
    success: function (e) {
      console.log(e)
    },
    error: function (e) {
      console.log(e)
    },
    orderPopupShow (e) {
      console.log(e)
    },
    orderPopupHide (e) {
      console.log(e)
    },
    setCity (cityCode) {
      this.city = cityCode
    },
    setCarType (type) {
      this.carType = type
    },
    setCarInner () {
      this.carInner = !this.carInner
    },
    submit () {
      console.log('submit')
    },
    onPhoneBlur () {},
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
            z.$router.push('/pintuan/my')
          }
        })
      }
    }
  },
  mounted () {
    console.log(this)
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
  .countdown {
    
  }
  .avatar {
    width: 3em;
    height: 3em;
    margin-right: 2px;
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
      margin-right: 2px;
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
        background-image: url(../../../static/pintuan/car-5.png);
      }
      .car5.selected {
        background-image: url(../../../static/pintuan/car-5-selected.png);
      }
      .suv5 {
        background-image: url(../../../static/pintuan/suv-5.png);
      }
      .suv5.selected {
        background-image: url(../../../static/pintuan/suv-5-selected.png);
      }
      .suv7 {
        background-image: url(../../../static/pintuan/suv-7.png);
      }
      .suv7.selected {
        background-image: url(../../../static/pintuan/suv-7-selected.png);
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
</style>
