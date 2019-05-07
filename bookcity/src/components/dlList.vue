<template>
    <dl  :class='classname' 
    @click="$router.push(`/detail/${bookid}?title=${title}`)">
        <dt>
            <img :src="img" alt="">
        </dt>
        <dd>
            <h2>{{title}}</h2>
            <slot></slot>
        </dd>
    </dl>
</template>
<script>
export default {
    props:{
        'img':{
            type:String,
        },
        'title':{
            type:String
        },
        'classname':{
            type:String,
            required:true
        },
        'bookid':{
            type:Number,
            required:true
        }
    },
   
}
</script>
<style lang="scss" scoped>
    dl.upopen{
        width: 30%;
        height: 200px;
        margin-right: 10px;
        >dt{
            width: 100%;
            height: 150px;
            margin: 5px 0;
            >img{
                width: 100%;
                height: 100%;
            }
        }
        >dd{
            width: 100%;
            >h2{
                font-weight: 600;
                font-size: 16px;
            }
        }
    }
    dl.leftopen{
        width: 100%;
        height: 150px;
        display:flex;
         >dt{
            width: 120px;
            height: 140px;
            margin: 5px 0;
            >img{
                width: 100%;
                height: 100%;
            }
        }
        >dd{
            flex: 1;
            margin-left: 10px;
            >div{
                color: #ccc;
                >p{
                    margin-top: 10px;
                }
            }
        }
    }
</style>

