<template>
  <el-container style="height:100%">
    <!-- 侧边栏区域 -->
    <el-aside width="auto">
      <CommonAside/>
    </el-aside>
      <el-container>
        <el-header>
          <CommonHeader/>
        </el-header>
        <!-- 公共组件Tag的位置 -->
        <CommonTag/>
        <el-main>
          <!-- 路由组件位置 -->
        <router-view></router-view>
        </el-main>
      </el-container>
</el-container>
</template>

<script>
//引入侧边栏组件
import CommonAside from '../components/CommonAside.vue'
//引入header组件
import CommonHeader from '../components/CommonHeader.vue'
//引入tab组件
import CommonTag from '../components/CommonTag.vue'
export default {
    name:'Main',
    components:{CommonAside,CommonHeader,CommonTag},
    data(){
      return{}
    }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: pink;
}

.el-main{
  padding-top: 0;
}
</style>