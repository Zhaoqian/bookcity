import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect:'bookcity',
    },{
        path: '/bookcity',
        name:'bookcity',
        component: ()=>import('@/views/bookcity.vue')
    },
    {
        path: '/bookshif',
        name:'bookshif',
        component: ()=>import('@/views/bookshif.vue')
    },  {
        path: '/search',
        name:'search',
        component: ()=>import('@/views/search.vue')
    }, {
        path: '/detail/:bookid',
        props:true,
        name:'detail',
        component: ()=>import('@/views/detail.vue')
    }, {
        path: '/login',
        name:'login',
        component: ()=>import('@/views/login.vue')
    }, {
        path: '/read',
        name:'read',
        beforeEnter(to,from,next){
            if(window.localStorage.getItem("user")){
                next()
            }else{
                next('/login')
            }
        },
        component: ()=>import('@/views/read.vue'),

    }]
});
