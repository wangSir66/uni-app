import request from './request.js'

let api = {}
//1.商家今日数据
api.Main = params => request.globalRequest('Main', 'POST', params, 1, true)
//2.密码登录
api.PhoneLogin = params => request.globalRequest('PhoneLogin', 'POST', params, 1, true)
//3.获取验证码
api.PhoneCode = params => request.globalRequest('PhoneCode', 'POST', params, 1, true)
//4.验证码登录
api.PhoneValidCode = params => request.globalRequest('PhoneValidCode', 'POST', params, 1, true)
//5.确认订单
api.OrderMsg = params => request.globalRequest('OrderMsg', 'POST', params, 1, false)
//6.获取订单列表
api.OrderList = params => request.globalRequest('OrderList', 'POST', params, 1, false)
//7.核销
api.WriteOff = params => request.globalRequest('WriteOff', 'POST', params, 1, true)
//8.获取版本信息
api.AppVersion = params => request.globalRequest('AppVersion', 'GET', params, 1, true)
//9.查询手机号是否可开通
api.QueryPhone = params => request.globalRequest('QueryPhone', 'POST', params, 1, true)
//10.查询开通记录
api.Record = params => request.globalRequest('Record', 'POST', params, 1, true)
//11.开通下级
api.LowerLevel = params => request.globalRequest('LowerLevel', 'POST', params, 1, true)
//12.游戏类型
api.GameTypeList = params => request.globalRequest('GameType', 'GET', params, 1, true)
//13.编辑下级信息
api.EditLower = params => request.globalRequest(`EditLower`, 'POST', params, 1, true)
//14.条件查询下级(我的下级)
api.LowerList = params => request.globalRequest(`LowerList`, 'POST', params, 1, true)
//15.冻结/解冻下级 
api.Frozen = params => request.globalRequest(`Frozen`, 'POST', params, 1, true)
//16.月业绩情况
api.MonthDataDetailInfo = params => request.globalRequest(`MonthDataDetailInfo`, 'POST', params, 1, true)
export default api