import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import Products from '@/components/pages/Products'
import CustomOrder from '@/components/pages/CustomOrder'
import CustomerCheckout from '@/components/pages/CustomerCheckout'

Vue.use(VueRouter)

export default new VueRouter({
   routes:[
    {
      path:'*',
      redirect:'login'
    },
    {
      name:'首頁',
      path:'/index',
      component:Home,
      meta: { requiresAuth: true }
    },
    {
      name:'登入',
      path:'/login',
      component:Login
    },
    {
      name:'dash',
      path:'/admin',
      component:Dashboard,
      children:[
        {
          name:'products',
          path:'products',
          component:Products,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      name:'dash2',
      path:'/',
      component:Dashboard,
      children:[
        {
          name:'custom',
          path:'custom',
          component:CustomOrder,
        },
        {
          name:'customer_checkout',
          path:'customer_checkout/:orderId',
          component:CustomerCheckout,
        },
      ]
    },
   ]
})