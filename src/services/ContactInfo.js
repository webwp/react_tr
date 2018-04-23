import request from '../utils/axiosRequest';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 列表数据读取
export async function queryList (params) {
	return request(publicProInterface.requestURL+'/client/passengers', {
		method: 'GET',
		body: params
	});
}

// 常用联系人添加
export async function add (params) {
	return request(publicProInterface.requestURL+'/client/passengers', {
		method: 'POST',
		body: params
	});
}
// 常用联系人删除
export async function onDel (params) {
	return request(publicProInterface.requestURL+'/client/passengers/'+params.id, {
		method: 'delete',
		//body: params
	});
}

// 常用联系人删除
export async function getPassengers (params) {
	return request(publicProInterface.requestURL+'/client/passengers/'+params.id, {
		method: params.method,
		body: params
	});
}
