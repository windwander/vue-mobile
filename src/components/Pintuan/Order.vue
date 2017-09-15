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
    <group labelWidth="4em" gutter="0">
      <x-input name="mobile" title="手机号" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" @on-blur="onPhoneBlur"></x-input>
      <x-input name="verifyCode" title="验证码" placeholder="请输入验证码" keyboard="number" :min="3" :max="5" @on-blur="onPhoneBlur">
        <x-button slot="right" type="primary" mini>获取验证码</x-button>
      </x-input>
    </group>
    <group labelWidth="4em" labelAlign="left" gutter="0.5em">
      <x-input title="城市" disabled v-model="cityName"></x-input>
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
      <cell title="微信支付">
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
            <span class="number">20.00</span>
          </span>
        </div>
      </flexbox-item>
      <flexbox-item class="bottombar-item" :span="3/8">
        <a href="javascript:void(0);" class="btn-pintuan">
          去支付
        </a>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Group,
  Cell,
  XInput,
  XButton
} from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      carTypeName: '五座小轿车',
      carInner: true,
      cityName: '南京'
    }
  },
  methods: {
    onPhoneBlur (e) {
      console.log(e)
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
  .buy-tips {
    text-align: left;
    font-size: 0.875rem;
    color: #666;
  }
  .wechat-pay-icon {
    width: 2em;
    margin-right: 1em;
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
