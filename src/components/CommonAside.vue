<!-- 创建侧边栏 -->
<template>
<!-- 调整整个侧边栏的样式 -->
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color='#ffd04b' @open="handleOpen" @close="handleClose" :collapse="isCollapse">
   <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
   <!-- 一级标题 -->
   <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index='item.path' :key="item.path" >
        <i :class="'el-icon-'+ item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- 二级标题 -->
  <el-submenu v-for="item in hasChildren" :index='item.path' :key="item.path">
        <template slot="title">
            <i :class="'el-icon-' +item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
            <span slot="title"></span>
            <el-menu-item @click="clickMenu(subItem)" :index='subIndex'>{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
</el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
  }
}
    
</style>

<script>
  export default {
    name:'CommonAside',
    data() {
      return {
        menu:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //点击跳转路由页面
      clickMenu(item){
        this.$router.push({
            name:item.name
        })
        //面包屑方法函数
        this.$store.commit('selectMenu',item)
      }
    },
    computed:{
        noChildren(){
            return this.asyncMenu.filter(item=>!item.children)
        },
         hasChildren(){
            return this.asyncMenu.filter(item=>item.children)
        },
        //计算属性左侧导航栏是否展开
        isCollapse(){
          return this.$store.state.tab.isCollapse  
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
  }
  }
</script>