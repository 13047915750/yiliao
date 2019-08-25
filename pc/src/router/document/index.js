export default [
  {
    path: '/document',
    name: 'document',
    redirect: 'noredirect',
    meta: { title: '文章管理', icon: 'icon-dingdan' },
    component: () => import('@/pages/Layout' /* webpackChunkName: 'document' */), // 文章模块
    children: [
      {
        path: 'list',
        name: 'document-list',
        meta: { title: '文章列表' },
        component: () => import('@/pages/document/list' /* webpackChunkName: 'document-list' */),
        children: [
          {
            path: 'insert',
            name: 'document-insert',
            meta: { title: '创建文章', hidden: true },
            component: () => import('@/pages/document/upsert' /* webpackChunkName: 'document-Insert' */)
          },
          {
            path: 'update',
            name: 'document-update',
            meta: { title: '编辑文章', hidden: true },
            component: () => import('@/pages/document/upsert' /* webpackChunkName: 'document-update' */)
          }
        ]
      }
    ]
  }
]
