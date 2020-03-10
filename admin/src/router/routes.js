import Login from '@/pages/Login'
import User from '@/pages/User'
import Classify from '@/pages/Classify'
import Article from '@/pages/Article'
import ArticleCreate from '@/pages/ArticleCreate'
import ArticleEdit from '@/pages/ArticleEdit'
import BasicLayout from '@/components/BasicLayout.vue'
import Index from '@/pages/Index'

export default [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '信息管理系统-登录'
    }
  },
  {
    path: '/admin',
    component: BasicLayout,
    children: [
      {
        path: '/admin/user',
        name: 'User',
        component: User,
        meta: {
          title: '信息管理系统-用户信息'
        }
      },
      {
        path: '/admin/classify',
        name: 'Classify',
        component: Classify,
        meta: {
          title: '信息管理系统-分类信息'
        }
      },
      {
        path: '/admin/article',
        name: 'Article',
        component: Article,
        meta: {
          title: '信息管理系统-文章信息'
        }
      },
      {
        path: '/admin/article/create',
        name: 'ArticleCreate',
        component: ArticleCreate,
        meta: {
          title: '信息管理系统-添加文章'
        }
      },
      {
        path: '/admin/article/edit/:id',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          title: '信息管理系统-修改文章'
        }
      }
    ]
  }
]
