<template>
    <div class="wrap">
        <Head>
            <span @click="$router.push('/')"><</span>
            <input type="text" placeholder="请输入书名/关键字">
            <span>搜索</span>
        </Head>
    </div>
</template>
<style lang="scss" scoped>
    input{
        width: 70%;
        background: #fff;
        outline: none;
        height: 70%;
        border:1px solid #ccc;
    }
</style>

