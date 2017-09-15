import Vue from 'vue'
import Router from 'vue-router'
import setWechatTitle from '../utils/setWechatTitle.js'
import Hello from '@/components/Hello'
import PintuanProduct from '@/components/Pintuan/Product'
import PintuanOrder from '@/components/Pintuan/Order'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        title: '主页'
      }
    }, {
      path: '/pintuan/product',
      name: 'PintuanProduct',
      component: PintuanProduct,
      meta: {
        title: '商品详情页'
      }
    }, {
      path: '/pintuan/order',
      name: 'PintuanOrder',
      component: PintuanOrder,
      meta: {
        title: '确认订单'
      }
    }
  ]
})
router.afterEach(route => {
  let title = route.meta.title // + '-Custom-Suffix'
  setWechatTitle(title)
})
export default router
