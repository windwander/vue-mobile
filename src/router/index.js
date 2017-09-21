import Vue from 'vue'
import Router from 'vue-router'
import setWechatTitle from '../utils/setWechatTitle.js'
import Hello from '@/components/Hello'
import PintuanProduct from '@/components/Pintuan/Product'
import PintuanOrder from '@/components/Pintuan/Order'
import PintuanList from '@/components/Pintuan/List'
import PintuanMy from '@/components/Pintuan/My'
import PintuanIntroduce from '@/components/Pintuan/Introduce'

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
        title: '商品详情页',
        scrollToTop: true
      }
    }, {
      path: '/pintuan/order',
      name: 'PintuanOrder',
      component: PintuanOrder,
      meta: {
        title: '确认订单',
        scrollToTop: true
      }
    }, {
      path: '/pintuan/list',
      name: 'PintuanList',
      component: PintuanList,
      meta: {
        title: '全部拼团',
        scrollToTop: true
      }
    }, {
      path: '/pintuan/my',
      name: 'PintuanMy',
      component: PintuanMy,
      meta: {
        title: '我的拼团',
        scrollToTop: true
      }
    }, {
      path: '/pintuan/introduce',
      name: 'PintuanIntroduce',
      component: PintuanIntroduce,
      meta: {
        title: '使用说明',
        scrollToTop: true
      }
    }
  ]
})
router.afterEach(route => {
  let title = route.meta.title // + '-Custom-Suffix'
  setWechatTitle(title)
})
export default router
