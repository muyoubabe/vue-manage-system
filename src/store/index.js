import Vue from 'vue'
import Vuex from 'vuex'

//引入tab文件
import tab from './tab'
//引入user文件
import user from './user'

//使用store
Vue.use(Vuex)


//创建一个store
export default new Vuex.Store({
    modules:{
        tab,
        user
    }
})

