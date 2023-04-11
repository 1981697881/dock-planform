import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 车辆信息-获取列表
export function getVehicleInformationList(params, data) {
  const url = '/vehicleInformation/vehicleInformationList/' + params.pageNum + '/' + params.pageSize
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
// 车辆信息-新增/修改
export function addVehicleInformation(params) {
  const url = '/vehicleInformation/add'
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
// 车辆信息-刪除
export function deleteVehicleInformation(params) {
  const url = '/vehicleInformation/delete'
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
// 司机信息-获取列表
export function getDriverList(params, data) {
  const url = '/driver/driverList/' + params.pageNum + '/' + params.pageSize
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
// 司机信息-新增/修改
export function addDriver(params) {
  const url = '/driver/add'
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
// 司机信息-刪除
export function deleteDriver(params) {
  const url = '/driver/delete'
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
// 到货入库-获取列表
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
