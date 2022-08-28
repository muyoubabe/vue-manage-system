import Vue from 'vue'
import App from './App.vue'
//引入element部分组件
import { Button, Container, Aside, Header, Main, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option, Dialog, Pagination,MessageBox,Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


//引入样式资料
import './assets/less/index.less'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入store文件
import store from './store'
//引入axios
import http from 'axios'
//引入mock
import './api/mock'

Vue.config.productionTip = false


//使用element组件
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)

//使用插件
Vue.use(VueRouter)
//配置axios
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
//全局路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'Login'){
    next({name:'Login'})
  }else if (token && to.name === 'Login') {
    next({ name:'Home'})
  }else {
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
