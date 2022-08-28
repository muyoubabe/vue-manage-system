<template>
    <!-- 公共区域的tab -->
  <div class="tabs">
    <el-tag 
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name !== 'home'"
    :effect="$route.name === tag.name ? 'dark' :'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    size="small"
    >
    {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState ,mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    data(){
        return{

        }
    },
    computed:{
         ...mapState({
                tags:state => state.tab.tabList
            })
    },
    methods:{
        //调用tab.js中的删除事件
        ...mapMutations({
            close:'closeTag'
        }),
        //tab点击事件
        changeMenu(item){
            this.$router.push({name:item.name})

        },
        //tab删除事件
        handleClose(tag,index){
            //删除
            const length = this.tags.length -1
            this.close(tag)
            if(tag.name !== this.$route.name){
                return
            }
            if(index === length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }


        }


    }
    }
</script>

<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}



</style>