<template>
    <div class="wrap">
          <Head>
             <span >签到</span>
              <ul class="list">
                  <router-link to="/bookcity" tag="li">书城</router-link>
                  <router-link to="/bookshif" tag="li">书架</router-link>
              </ul>
              <span class="iconfont icon-wode"></span>
          </Head>
          <main>
              <div class="search">
                  <router-link to="/search" tag="input"></router-link>
              </div>
              <div class="swiper-container" ref="swiper">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="val in swiperList"
                      :key="val.id">
                            <img :src="val.ad_pic_url" alt="">
                      </div>
                  </div>
              </div>
              <div class="hot">
                  <h2>本周最火</h2>
                  <div class="dlList">
                      <dllist v-for="val in weekHot"
                      :key='val.fiction_id'
                      :img="val.cover"
                      :title='val.title'
                      classname="upopen"
                      :bookid="val.fiction_id"></dllist>
                  </div>
              </div>
              <div class="letter">
                  <h2>本周推荐</h2>
                   <div class="dlList">
                      <dllist v-for="val in letter"
                      :key='val.fiction_id'
                      :img="val.cover"
                      :title='val.title'
                      classname="leftopen"
                      :bookid="val.fiction_id">
                        <div class="detail">
                            <p>{{val.authors}}</p>
                            <p>已读：{{val.latest}}</p>
                            <p>最新：</p>
                        </div>
                      </dllist>
                  </div>
              </div>
          </main>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    data(){
        return {
            swiperList:[],
            weekHot:[],
            letter:[]
        }
    },
    created(){
        this.$ajax('/api/list').then(res=>{
            this.swiperList=res.data.items[0].data.data;
            this.weekHot = res.data.items[1].data.data;
            this.letter=res.data.items[2].data.data;
            this.$nextTick(()=>{
                new Swiper(this.$refs.swiper,{
                    loop:true,
                    autoplay:true
                })
            })
        })
    }
}
</script>
<style lang="scss" scoped>
   .search{
       width: 100%;
       height: 45px;
       display: flex;
       align-items: center;
       justify-content: center;
       >input{
           width: 90%;
           height: 40px;
           outline: none;
           border:1px solid #ccc;
       }
   }
   .swiper-container{
       img{
           width: 100%;
       }
   }
   .hot>h2{
       width: 100%;
       height: 50px;
       border-bottom: 1px solid #ccc;
       line-height: 50px;
   }
   .dlList{
       width: 100%;
       display: flex;
       flex-wrap: wrap;
   }
</style>
