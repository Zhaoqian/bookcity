<template>
    <header>
       <!-- <router-link to="/"  :v-if="back"><</router-link> -->
       <slot></slot>
    </header>
</template>
<script>
export default {
    props:{
        back:{
            default:false
        }
    },
    data(){
        return {
           
        }
    }
}
</script>
<style lang="scss" scoped>
    header{
        width: 100%;
        height: 40px;
        background: #cce;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 10px;
        >ul{
            width: 70%;
            display: flex;
            align-items: center;
            >li{
                flex: 1;
                text-align: center;
            }
            .router-link-exact-active{
               color: orangered;
            }
        }
    }
    
</style>

