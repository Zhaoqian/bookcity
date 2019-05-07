<template>
    <div class="wrap">
        <Head>
            <span @click="$router.back('-1')"><</span>
            <h3>{{this.$route.query.title}}</h3>
            <span class="iconfont icon-shouye" @click="$router.push('/')"></span>
        </Head>
        <main>
            <div class="con">
                 <div v-if="loading">
                      loading...
                 </div>
                 <template v-if="!loading">
                     <div v-if="list.code==0">{{list.msg}}</div>
                     <div v-else>
                           <dllist :img="list.msg.item.cover"
                        :title='list.msg.item.title'
                         classname="leftopen"
                        :bookid="list.msg.item.fiction_id">
                         <div>
                             <p>{{list.msg.item.authors}}</p>
                             <p>{{list.msg.item.latest}}</p>
                         </div>
                        </dllist>
                        <div class="click">
                            <button class="start"
                                    @click="$router.push('/read')">开始阅读</button>
                        <button class="down">下载</button>
                        </div>
                        <div class="content">
                            {{list.msg.item.content}}
                        </div>
                     </div>
                    
                        
                 </template>                                    
         </div>
        </main>
        
    </div>
</template>
<script>
export default {
    props:['bookid'],
    data(){
        return {
            list:null,
            loading:true
        }
    },
    created(){
        this.$ajax('/api/detail?bookid='+this.bookid).then(res=>{        
              this.list = res.data;
              this.loading =false;      
                console.log(this.list.code)
            
        })
        
    }
}
</script>
<style lang="scss" scoped>
    .click{
        width: 100%;
        display: flex;
        >button{
            width: 40%;
            margin: 10px;
            outline: none;
            border: none;
            background: #fff;
            height: 40px;
            border-radius: 5px;
        }
        .start{
            background: orange;
            color: #fff;
        }
        .down{
            border:1px solid #eee;
        }
    }
    .content{
        color: #ccc;
        border-bottom: 1px solid #ccc;
        padding:10px;
    }
</style>

