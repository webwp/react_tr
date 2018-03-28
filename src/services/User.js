import request from '../utils/request';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 用户登录
export async function userLogin (params) {
	return request(publicProInterface.requestURL+'/api/login', {
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