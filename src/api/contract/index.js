import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 物资信息-获取列表
export function getMaterialList(params, data) {
  const url = '/material/materialList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 物资信息-同步
export function synchronization(params) {
  const url = '/material/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 仓库信息-获取列表
export function getStorehouseList(params, data) {
  const url = '/storehouse/storehouseList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 仓库信息-新增/修改
export function addStorehouse(params) {
  const url = '/storehouse/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 仓库信息-刪除
export function deleteStorehouse(params) {
  const url = '/storehouse/delete'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 合同信息-获取列表
export function getProjectList(params, data) {
  const url = '/project/projectList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 合同信息-同步
export function synchronizationProject(params) {
  const url = '/project/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 排产信息-获取列表
export function getProjectplanList(params, data) {
  const url = '/projectplan/projectplanList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 排产信息-资料确认
export function synchronizationProjectplan(params) {
  const url = '/projectplan/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 配送服务-获取列表
export function getDistributionList(params, data) {
  const url = '/distribution/distributionList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 配送服务-同步
export function synchronizationDistribution(params) {
  const url = '/distribution/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 款项管理-获取列表
export function getPaymentList(params, data) {
  const url = '/payment/paymentList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 款项管理-同步
export function synchronizationPayment(params) {
  const url = '/payment/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 到货入库-获取列表
export function getEntryList(params, data) {
  const url = '/entry/entryList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 到货入库-同步
export function synchronizationEntry(params) {
  const url = '/entry/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
