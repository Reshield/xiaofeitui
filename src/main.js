// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

import index from './components/index'
//使用vux组件库
import {Blur,Badge,Cell,Group,Previewer,Popup,Search,Swiper,SwiperItem,Tabbar,TabbarItem,Toast,TransferDom,XInput,XButton,XTextarea,XImg,XHeader,} from 'vux'
//使用element-ui组件库
import { Button, Select,Upload,Dialog,Input,Option} from 'element-ui';
import Axios from 'axios'
import panel from './components/panel.vue'
import commentpanel from './components/commentpanel.vue'

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-input',XInput)
Vue.component('x-button',XButton)
Vue.component('toast',Toast)
Vue.component('x-textarea',XTextarea)
Vue.component('group',Group)
Vue.component('panel',panel)
Vue.component('x-img',XImg)
Vue.component('commentpanel',commentpanel)
Vue.component('blur',Blur)
Vue.component('cell',Cell)
Vue.component('badge',Badge)
Vue.component('x-header',XHeader)
Vue.component('search',Search)
Vue.component('previewer', Previewer)
Vue.component('Swiper', Swiper)
Vue.component('SwiperItem', SwiperItem)
Vue.component('popup', Popup)
Vue.directive('transfer-dom', TransferDom)

//element-ui组件
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Input)


Vue.prototype.$http=Axios

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path=='/user' || to.path=='/modified'){
    if(token ==null || token =='null'){
      next('/login')
    }else{11
      next()
    }
  }else{
    if(token !=null && token != 'null'){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next()
    }else{
      next()
    }
  }
})



/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
