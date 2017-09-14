import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/product',
      name: 'Product',
      component: Product
    }
  ]
})
