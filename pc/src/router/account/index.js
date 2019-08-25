export default [
  {
    path: '/account',
    name: 'account',
    redirect: 'noredirect',
    meta: { title: '账户管理', icon: 'icon-xiaozu' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'account' */), // 账号模块
    children: [
      {
        path: 'doctor',
        name: 'doctor',
        meta: { title: '医生管理' },
        redirect: '/account/doctor/white',
        component: () => import('@/pages/account/doctor' /* webpackChunkName: 'doctor' */),
        children: [
          {
            path: 'white',
            name: 'doctor-white',
            meta: { title: '白名单' },
            component: () => import('@/pages/account/doctor/white' /* webpackChunkName: 'doctor-white' */)
          },
          {
            path: 'black',
            name: 'doctor-black',
            meta: { title: '黑名单' },
            component: () => import('@/pages/account/doctor/black' /* webpackChunkName: 'doctor-black' */)
          }
        ]
      },
      {
        path: 'patient',
        name: 'patient',
        meta: { title: '患者管理' },
        redirect: '/account/patient/white',
        component: () => import('@/pages/account/patient' /* webpackChunkName: 'patient' */),
        children: [
          {
            path: 'white',
            name: 'patient-white',
            meta: { title: '白名单' },
            component: () => import('@/pages/account/patient/white' /* webpackChunkName: 'patient-white' */)
          },
          {
            path: 'black',
            name: 'patient-black',
            meta: { title: '黑名单' },
            component: () => import('@/pages/account/patient/black' /* webpackChunkName: 'patient-black' */)
          }
        ]
      }
    ]
  }
]
