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
      <div class="coupon-all">
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
          <img class="avatar" src="static/coupon/avatar@2x.png" alt="用户头像" />
          <img class="avatar" src="static/coupon/avatar-default@2x.png" alt="用户头像" />
        </flexbox-item>
        <flexbox-item>
          <x-button mini plain type="primary" class="btn">直接参团</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="qr-row">
      <img class="img" src="static/coupon/qr-row@2x.png" alt="公众号二维码">
    </div>
    <tab v-model="tabIndex">
      <tab-item selected @on-item-click="onTabClick">商品详情</tab-item>
      <tab-item @on-item-click="onTabClick">用户评价</tab-item>
      <tab-item @on-item-click="onTabClick">玩法介绍</tab-item>
    </tab>
    <div v-if="tabIndex === 0">
      <video src="static/product/carwash/1.mp4" controls preload="metadata" poster="static/product/carwash/1.png" width="100%"></video>
      <x-img v-for="n in 11" :key="n" default-src="static/product/placeholder.png" :src="'static/product/carwash/' + (n + 1) + '.png'" class="ximg" error-class="ximg-error" :offset="100" ></x-img>
    </div>
    <div class="bottombar-push"></div>
    <flexbox class="bottombar">
      <flexbox-item class="bottombar-item">
        <a href="/" class="btn-my">
          <img slot="icon" src="static/coupon/my-icon@2x.png" class="my-icon"><br/>
          我的拼团
        </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
      <a href="/" class="btn-single">
        35元起<br/>单独购买
      </a>
      </flexbox-item>
      <flexbox-item class="bottombar-item">
        <a href="javascript:void(0);" class="btn-coupon">
          20元起<br/>3人拼团
        </a>
      </flexbox-item>
    </flexbox>
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
  TabbarItem
} from 'vux'

export default {
  name: 'Product',
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
    TabbarItem
  },
  data () {
    return {
      swiper: [
        'static/coupon/banner@2x.png'
      ],
      tabIndex: 0
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
  .coupon-all {
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
  .btn-coupon {
    display: block;
    padding: 0.72em 0;
    color: #fff;
    background-color: @theme-color;
  }
}
</style>
