import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'

/* blog view */
import Home from '../views/Blog/Home.vue'
import About from '../views/Blog/About.vue'
import Post from '../views/Blog/Post.vue'
import List from '../views/Blog/List.vue'

/* Admin view */
import AdminHome from '../views/Admin/AdminHome.vue'
import BlogInfo from '../views/Admin/BlogInfo.vue'
import WritePost from '../views/Admin/WritePost.vue'
import ManagePost from '../views/Admin/ManagePost.vue'
import ManageCategory from '../views/Admin/ManageCategory.vue'

Vue.use(VueRouter)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'https://nemv-stack.run.goorm.io/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath

axios.defaults.baseURL = apiRootPath // axios기본 요청 url 추가

const routes = [
  /* Blog Routes */
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: Post
  },
  {
    path: '/categories/:smallCat',
    name: 'List',
    component: List
  },

  /* Admin Routes */
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/blogInfo',
    name: 'BlogInfo',
    component: BlogInfo
  },
  {
    path: '/admin/writePost',
    name: 'WritePost',
    component: WritePost
  },
  {
    path: '/admin/managePost',
    name: 'ManagePost',
    component: ManagePost
  },
  {
    path: '/admin/manageCat',
    name: 'ManageCategory',
    component: ManageCategory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
