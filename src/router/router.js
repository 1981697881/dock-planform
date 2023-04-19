export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),
  'essential': () => import('@/views/basic/essential'),
  'company': () => import('@/views/basic/company'),

  'agreement': () => import('@/views/contract/agreement'),
  'delivery': () => import('@/views/contract/delivery'),
  'material': () => import('@/views/contract/material'),
  'payment': () => import('@/views/contract/payment'),
  'scheduling': () => import('@/views/contract/scheduling'),
  'warehouse': () => import('@/views/contract/warehouse'),
  'supplierWarehousing': () => import('@/views/contract/supplierWarehousing'),

  'arrival': () => import('@/views/logistics/arrival'),
  'driver': () => import('@/views/logistics/driver'),
  'intransit': () => import('@/views/logistics/intransit'),
  'transportPlan': () => import('@/views/logistics/transportPlan'),
  'vehicle': () => import('@/views/logistics/vehicle'),


  'parameters': () => import('@/views/system/parameters'),
  'users': () => import('@/views/system/users'),
}
