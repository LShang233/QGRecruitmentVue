import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Login from '@/views/Login/Login'
import Statistic from '@/views/Statistic/Statistic'
import EnrollInfo from '@/views/EnrollInfo/EnrollInfo'
import TestResult from '@/views/TestResult/TestResult'
import NoticeStatus from '@/views/NoticeStatus/NoticeStatus'
import Notitemplate from '@/views/Notitemplate/Notitemplate'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: "Statistic",
      children: [
        {
          path: 'Statistic',
          name: 'Statistic',
          component: Statistic
        },
        {
          path: 'EnrollInfo',
          name: 'EnrollInfo',
          component: EnrollInfo
        },
        {
          path: 'TestResult',
          name: 'TestResult',
          component: TestResult
        },
        {
          path: 'NoticeStatus',
          name: 'NoticeStatus',
          component: NoticeStatus
        },
        {
          path: 'Notitemplate',
          name: 'Notitemplate',
          component: Notitemplate
        }
      ]
    }
  ]
})
