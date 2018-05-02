import request from '../utils/request';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 获取通知
export async function getNotifications (params) {
	return request(publicProInterface.requestURL+'/client/message/notifications', {
		method: 'get',
		body: params
	});
}

// 获取通知详情 getNotificationDetail
export async function getNotificationDetail (params){
	return request(publicProInterface.requestURL+'/client/message/notifications/'+params.id, {
		method: 'get',
		body: params
	});
}
