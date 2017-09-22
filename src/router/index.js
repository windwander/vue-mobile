import Vue from 'vue'
import Router from 'vue-router'
import setWechatTitle from '../utils/setWechatTitle.js'
import Hello from '@/components/Hello'
import PintuanProduct from '@/components/Pintuan/Product'
import PintuanOrder from '@/components/Pintuan/Order'
import PintuanList from '@/components/Pintuan/List'
import PintuanMy from '@/components/Pintuan/My'
import PintuanIntroduce from '@/components/Pintuan/Introduce'
import PintuanProductHa from '@/components/Pintuan-HuaiAn/Product'
import PintuanOrderHa from '@/components/Pintuan-HuaiAn/Order'
import PintuanListHa from '@/components/Pintuan-HuaiAn/List'
import PintuanMyHa from '@/components/Pintuan-HuaiAn/My'
import PintuanIntroduceHa from '@/components/Pintuan-HuaiAn/Introduce'

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
    }, {
      path: '/pintuan-ha/product',
      name: 'PintuanProductHa',
      component: PintuanProductHa,
      meta: {
        title: '商品详情页',
        scrollToTop: true
      }
    }, {
      path: '/pintuan-ha/order',
      name: 'PintuanOrderHa',
      component: PintuanOrderHa,
      meta: {
        title: '确认订单',
        scrollToTop: true
      }
    }, {
      path: '/pintuan-ha/list',
      name: 'PintuanListHa',
      component: PintuanListHa,
      meta: {
        title: '全部拼团',
        scrollToTop: true
      }
    }, {
      path: '/pintuan-ha/my',
      name: 'PintuanMyHa',
      component: PintuanMyHa,
      meta: {
        title: '我的拼团',
        scrollToTop: true
      }
    }, {
      path: '/pintuan-ha/introduce',
      name: 'PintuanIntroduceHa',
      component: PintuanIntroduceHa,
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
