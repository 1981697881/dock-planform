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

  'machine': () => import('@/views/commodity/machine'),
  'ItemNo': () => import('@/views/commodity/ItemNo'),
  'series': () => import('@/views/commodity/series'),
  'label': () => import('@/views/commodity/label'),
  'colors': () => import('@/views/commodity/colors'),
  'sizes': () => import('@/views/commodity/sizes'),

  'agreement': () => import('@/views/contract/agreement'),
  'delivery': () => import('@/views/contract/delivery'),
  'material': () => import('@/views/contract/material'),
  'payment': () => import('@/views/contract/payment'),
  'scheduling': () => import('@/views/contract/scheduling'),
  'warehouse': () => import('@/views/contract/warehouse'),

  'arrival': () => import('@/views/logistics/arrival'),
  'driver': () => import('@/views/logistics/driver'),
  'intransit': () => import('@/views/logistics/intransit'),
  'transportPlan': () => import('@/views/logistics/transportPlan'),
  'vehicle': () => import('@/views/logistics/vehicle'),


  'parameters': () => import('@/views/system/parameters'),
  'users': () => import('@/views/system/users'),
}
