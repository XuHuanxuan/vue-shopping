import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Layout from '@/views/layout'

// 二级路由
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

// 一级路由，懒加载
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Login = () => import('@/views/login')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: 'home', component: Home },
        { path: 'category', component: Category },
        { path: 'cart', component: Cart },
        { path: 'user', component: User }
      ],
      redirect: '/home' // 重定向
    },
    { path: '/login', component: Login },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 全局导航守卫
const authUrl = ['/pay', '/myorder', '/cart']
router.beforeEach((to, from, next) => {
  // 1. to 往哪里去， 到哪去的路由信息对象
  // 2. from 从哪里来， 从哪来的路由信息对象
  // 3. next() 是否放行
  // 如果next()调用，就是放行
  // next(路径) 拦截到某个路径页面
  // console.log(to, from, next)
  const token = store.getters.getUserToken
  // console.log(token)
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
