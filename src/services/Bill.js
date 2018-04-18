import request from '../utils/axiosRequest';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 列表数据读取
export async function queryList (params) {
	return request(publicProInterface.requestURL+'/client/payment/bills', {
		method: 'GET',
		//body: params
	});
}

// 用户验证码登录
export async function userLoginCode (params) {
	return request(publicProInterface.requestURL+'/api/login_verify_code', {
		method: 'POST',
		body: params
	});
}

// 用户注册
export async function userReg (params) {
	return request(publicProInterface.requestURL+`/api/register`, {
		method: 'POST',
		body: params
	});
}

// 用户退出
export async function userLogout (params) {
	return request(publicProInterface.requestURL+`/api/logout`, {
		method: 'GET',
		body: params
	});
}

// 短信验证获取
export async function getCode (params) {
	return request(publicProInterface.requestURL+`/api/register_verify_code`,{
		method:"POST",
		body:params
	})
}