import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [
    {
      path: 'clerk',
      component: () => import('@/views/basic/clerk/index'),
      name: 'Clerk',
      meta: {
        title: '员工管理'
      }
    },{
      path: 'essential',
      component: () => import('@/views/basic/essential/index'),
      name: 'Essential',
      meta: {
        title: '基本信息'
      }
    }
  ]
}, {
  path: '/contract',
  component: Layout,
  name: 'Contract',
  meta: {
    title: '合同管理',
    icon: 'component'
  },
  children: [{
    path: 'material',
    component: () => import('@/views/contract/material/index'),
    name: 'Material',
    meta: {
      title: '物资信息'
    }
  },{
    path: 'warehouse',
    component: () => import('@/views/contract/warehouse/index'),
    name: 'Warehouse',
    meta: {
      title: '仓库信息'
    }
  },{
    path: 'agreement',
    component: () => import('@/views/contract/agreement/index'),
    name: 'Agreement',
    meta: {
      title: '合同管理'
    }
  },{
    path: 'scheduling',
    component: () => import('@/views/contract/scheduling/index'),
    name: 'Scheduling',
    meta: {
      title: '排产计划'
    }
  },{
    path: 'delivery',
    component: () => import('@/views/contract/delivery/index'),
    name: 'Delivery',
    meta: {
      title: '配送服务'
    }
  },{
    path: 'payment',
    component: () => import('@/views/contract/payment/index'),
    name: 'Payment',
    meta: {
      title: '款项管理'
    }
  }
  ]
}, {
  path: '/logistics',
  component: Layout,
  name: 'Logistics',
  meta: {
    title: '物流管理',
    icon: 'component'
  },
  children: [{
    path: 'vehicle',
    component: () => import('@/views/logistics/vehicle/index'),
    name: 'Vehicle',
    meta: {
      title: '车辆信息管理'
    }
  },{
    path: 'driver',
    component: () => import('@/views/logistics/driver/index'),
    name: 'Driver',
    meta: {
      title: '司机信息管理'
    }
  },{
    path: 'transportPlan',
    component: () => import('@/views/logistics/transportPlan/index'),
    name: 'TransportPlan',
    meta: {
      title: '运输计划管理'
    }
  },{
    path: 'intransit',
    component: () => import('@/views/logistics/intransit/index'),
    name: 'Intransit',
    meta: {
      title: '车辆在途管理'
    }
  },{
    path: 'arrival',
    component: () => import('@/views/logistics/arrival/index'),
    name: 'Arrival',
    meta: {
      title: '到货管理'
    }
  }
  ]
}, {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'component'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '用户管理'
    }
  },{
    path: 'parameters',
    component: () => import('@/views/system/parameters/index'),
    name: 'Parameters',
    meta: {
      title: '系统参数设置'
    }
  }]
}
 /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
