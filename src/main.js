// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate';
import { configure } from 'vee-validate';
import { required,email,digits } from 'vee-validate/dist/rules';


import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'

import './bus'
import filter from './filters/currency'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('Loading',Loading)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
})

Vue.filter('currency',filter)


extend('required',{
  ...required,
  message:'不能空白'
})

extend('email',{
    ...email,
    message:'需為Email格式'
})

extend('digits',{
  ...digits,
  message:'必須為10個數字'
})

axios.defaults.withCredentials=true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});

router.beforeEach((to, from, next) => {
   if(to.meta.requiresAuth){
    const api=`${process.env.APIPATH}/api/user/check`;
    const vm=this;
    axios.post(api).then(response =>{
      if(response.data.success){
         next()
      }else{
        next({path:'/login'})
      };
    });
  }else{
     next()
  } 
})
