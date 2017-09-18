<template>
  <div>
    <div class="qr-row">
      <img class="img" src="../../../static/pintuan/qr-row@2x.png" alt="公众号二维码">
    </div>
    <tab>
      <tab-item selected>全部拼团</tab-item>
      <tab-item disabled></tab-item>
      <tab-item disabled></tab-item>
    </tab>
    <div class="list-row">
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
              15分钟未付款的订单将自动关闭
            </div>
          </flexbox-item>
          <flexbox-item :span="3/10" class="btn-wrapper">
            <x-button mini plain type="primary" class="btn" action-type="button">去支付</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div class="list-row">
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
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Clocker,
  XButton
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
      carTypeName: '五座小轿车',
      carInner: true
    }
  },
  methods: {
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
