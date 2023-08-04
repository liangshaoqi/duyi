import { lazy } from 'react'
const routes =[
  {
    name: '首页',
    path: '/home',
    component: lazy(() => import('../views/home'))
  },
  {
    name: 'reactHooks',
    children: [
      {
        name: 'useMemo',
        path: '/useMemo',
        component: lazy(() => import('../views/useMemo'))
      },
      {
        name: 'useCallback',
        path: '/useCallback',
        component: lazy(() => import('../views/reactHooks'))
      },
      // // 使用路径的id
      {
        name: '路由传参',
        path: '/routeIdPage/:id',
        component: lazy(() => import('../views/routeIdPage'))
      },
    ]
  },
  {
    name: 'css',
    children: [
      {
        name: '切换css主题',
        path: '/theme',
        component: lazy(() => import('../views/theme'))
      },
    ]
  }
]
export default routes