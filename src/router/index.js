//引入整个应用的路由器
import VueRouter from "vue-router";
//引入组件
// import Main from '../views/Main'


//创建并暴露一个路由器
export default new VueRouter({
    mode:'history',
    routes:[
        {
        path:'/',
        name:'Main',
        component:()=> import('../views/Main.vue'),
        children:[]  
        },
        {
        path:'/login',
        name:'Login',
        component:()=> import('../views/Login/login.vue'),
        }


    ]
    
})