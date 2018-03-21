import request from '../utils/request';
import QS from 'query-string';
import {publicProInterface} from '../common/publicProInterface';




// 用户信息
export async function userLogin (params) {
	return request(publicProInterface()+'/api/login', {
		method: 'POST',
		body: params
	});
}

// 用户注册
export async function userReg (params) {
	return request(publicProInterface()+`/api/register`, {
		method: 'POST',
		body: params
	});
}

// 用户退出
export async function userLogout (params) {
	return request(publicProInterface()+`/api/logout`, {
		method: 'GET',
		body: params
	});
}

// 短信
export async function getCode (params) {
	return request(publicProInterface()+`/api/register_verify_code`,{
		method:"get",
		body:params
	})
}
