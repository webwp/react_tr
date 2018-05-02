import request from '../utils/request';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 获取资讯
export async function getNews (params) {
	return request(publicProInterface.requestURL+'/client/content/news', {
		method: 'get',
		body: params
	});
}
// 获取详情
export async function getDetail (params) {
	return request(publicProInterface.requestURL+'/client/content/'+params.id, {
		method: 'get',
		body: params
	});
}

//获取服务提醒
export async function getReminds (params) {
	return request(publicProInterface.requestURL+'/client/message/remind', {
		method: 'get',
		body: params
	});
}
//获取所有app应用
export async function getApplications (params) {
	return request(publicProInterface.requestURL+'/client/applications', {
		method: 'get',
		body: params
	});
}