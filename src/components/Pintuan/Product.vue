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
        <flexbox-item :span="2/5" class="vux-1px-r">
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
          <x-button mini plain type="primary" class="btn" action-type="button" >直接参团</x-button>
        </flexbox-item>
      </flexbox>
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
    <div class="bottombar-push"></div>
    <flexbox class="bottombar">
      <flexbox-item class="bottombar-item">
        <a href="/" class="btn-my">
          <img slot="icon" src="../../../static/pintuan/my-icon@2x.png" class="my-icon"><br/>
          我的拼团
        </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
      <a href="/" class="btn-single">
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
  </div>
</template>

<script>
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
  Popup
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
    Popup
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
      carInner: false
    }
  },
  methods: {
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
    }
  },
  route: {
    data: function () {
      document.title = '页面标题'
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
.qr-row {
  .img {
    width: 100%;
  }
}
.ximg {
  width: 100%;
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
</style>
