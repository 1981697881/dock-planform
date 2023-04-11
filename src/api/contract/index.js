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
// 排产信息-新增
export function addProductInfo(params) {
  const url = '/operation/addProductInfo'
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
}
// 款项管理-新增修改删除
export function updatePayment(params) {
  const url = '/operation/updatePayment'
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
// 合同入供应商-获取列表
export function getStorageList(params, data) {
  const url = '/storage/storageList/' + params.pageNum + '/' + params.pageSize
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
// 合同入供应商-同步
export function synchronizationStorage(params) {
  const url = '/storage/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 排产资料确认-获取列表
export function getConfirmationList(params, data) {
  const url = '/confirmation/confirmationList/' + params.pageNum + '/' + params.pageSize
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
// 排产资料确认-同步
export function synchronizationConfirmation(params) {
  const url = '/confirmation/synchronization'
  return request({
    url: url,
    headers: {
      'authorization': getToken('dockrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 排产节点-获取列表
export function getMaterialdetailList(params, data) {
  const url = '/materialdetail/materialdetailList/' + params.pageNum + '/' + params.pageSize
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
// 排产节点-同步
export function synchronizationMaterialdetail(params) {
  const url = '/materialdetail/synchronization'
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
