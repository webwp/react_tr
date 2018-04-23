import request from '../utils/request';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 用户密码登录
export async function userLogin (params) {
	return request(publicProInterface.requestURL+'/client/auth/login/password', {
		method: 'POST',
		body: params
	});
}

// 用户验证码登录
export async function userLoginCode (params) {
	return request(publicProInterface.requestURL+'/client/auth/login/captcha', {
		method: 'POST',
		body: params
	});
}

// 用户注册
export async function userReg (params) {
	return request(publicProInterface.requestURL+`/client/auth/register`, {
		method: 'POST',
		body: params
	});
}

// 用户退出
export async function userLogout (params) {
	return request(publicProInterface.requestURL+`/client/auth/logout`, {
		method: 'POST',
		body: params
	});
}

// 短信验证获取
export async function getCode (params) {
	return request(publicProInterface.requestURL+`/client/captcha/sms`,{
		method:"POST",
		body:params
	})
}

// 重置密码
export async function reSetPassword (params) {
	return request(publicProInterface.requestURL+`/client/auth/password/reset`,{
		method:"POST",
		body:params
	})
}
///client/profile/info
export async function updateUser (params) {
	return request(publicProInterface.requestURL+`/client/profile/info`,{
		method:"POST",
		body:params
	})
}
//获取已登录用户信息
export async function alreadyUser (params) {
	return request(publicProInterface.requestURL+`/client/profile/info`,{
		method:"GET",
		body:params
	})
}

//用户钱包
export async function Waller (params) {
	return request(publicProInterface.requestURL+`/client/payment/wallet`,{
		method:"GET",
		body:params
	})
}
