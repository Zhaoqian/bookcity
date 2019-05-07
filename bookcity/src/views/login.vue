<template>
    <div class="wrap">
        <main>
            <div class="login">
                 <input type="text" placeholder="请输入账号" v-model="user">
                 <input type="text" placeholder="密码" v-model="psd">
                 <button @click="addDl">登录</button>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:'',
            psd:''
        }
    },
    methods:{
        addDl(){
            if(this.user!=''&&this.psd!=''){
                  this.$ajax.post('/api/user',{
                        user:this.user,
                        psd:this.psd
                    }).then(res=>{
                        if(res.data.code==1){
                            alert(res.data.msg);  
                          this.$router.push('/read');

                            window.localStorage.setItem('user',res.data.item)
                        }else{
                            alert(res.data.msg)
                        }
                    })
            }else{
                alert('用户名或密码不能为空')
            }
          
        }
    }
}
</script>
<style lang="scss" scoped>
    .login{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        >input{
            width: 80%;
            outline: none;
            border: 0;
            border-bottom:1px solid #ccc;
            height: 40px;
            margin: 20px 0;
        }
        >button{
            width: 80%;
            outline: none;
            border:0;
            background: orange;
            height: 40px;
            color: #fff;
        }
    }
</style>

