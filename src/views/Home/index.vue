<template>
<!-- home布局 -->
    <div>
        <!-- 间隔为20的栅格布局 -->
        <el-row class="home" :gutter="20">
            <!-- 第一列栅格 -->
            <el-col :span="8" style='margin-top:20px'>
                <!--第一列栅格卡片区-->
                <el-card shadow="hover">
                    <div class="user">
                        <img :src="userImg"/>
                        <div class="userinfo">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间：<span>2021-7-19</span></p>
                        <p>上次登录地点：<span>武汉</span></p>
                    </div>
                </el-card>
                <!-- 第一列栅格图表区 -->
                <el-card style="margin-top:20px; height:460px">
                    <el-table :data="tableData">
                        <el-table-column 
                         v-for='(val,key) in tableLabel'
                         :key="key"
                        :prop="key" :label="val"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 第二例栅格 -->
            <el-col style='margin-top: 20px' :span="16">
                <!-- 订单统计 -->
                <div class="num">
                        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                            <div class="detail">
                                <p class="num">￥{{item.value}}</p>
                                <p class="txt">{{item.name}}</p>
                            </div>
                        </el-card>
                </div>
                <!-- 图表区域 -->
                <el-card style="height:280px">
                    <!-- <div  ref="echarts"></div> -->
                    <echart :chartData="echartData.order" style="height:280px"/>
                </el-card>
                <div class="graph">
                    <!-- 柱状图 -->
                    <el-card style="height:260px">
                        <!-- <div style="height:240px" ref="userEcharts"></div> -->
                    <echart :chartData="echartData.user" style="height:240px"/>

                    </el-card>
                    <!-- 饼图 -->
                    <el-card style="height:260px">
                        <!-- <div style="height:240px" ref="videoEcharts"></div> -->
                    <echart :chartData="echartData.video" :isAxisChart="false" style="height:280px"/>

                    </el-card>
                </div>

            </el-col>

        </el-row>
    </div>
</template>
<script>
//引入接口文件
import {getData} from '../../api/data'
//引入echarts
// import * as echarts from 'echarts'
//引入echart
import Echart from '../../components/Echarts.vue' 
export default {
    name:'Home',
    components:{
        Echart
    },
    data(){
        return{ 
            userImg:require('../../assets/images/user.png'),
            tableData:[],
            tableLabel:{
                name:'课程',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
            echartData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted(){
        getData().then((res)=>{
            const{code,data} = res.data
            if(code === 20000){
                this.tableData = data.tableData
                //对折现表格数据进行处理
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key => {
                    series.push({
                        name:key,
                        data:order.data.map(item => item[key]),
                        type:'line'
                    })
                })
                //折线图
                this.echartData.order.xData = xData
                this.echartData.order.series = series

                //条状图 
                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [{
                        name:'新增用户',
                        data:data.userData.map(item => item.new),
                        type:'bar'
                        },
                        {
                        name:'活跃用户',
                        data:data.userData.map(item => item.active),
                        type:'bar'
                        }]

                //饼状图
                //绘制饼状图
                // const V = echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoOption)
                this.echartData.video.series = [{
                            data:data.videoData,
                            type:'pie'
                        }]

            }
            console.log(res)
        })
    }
    
}
</script>