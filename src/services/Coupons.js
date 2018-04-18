import request from '../utils/axiosRequest';
import QS from 'query-string';
import publicProInterface from '../common/publicProInterface';




// 列表数据读取
export async function queryList (params) {
	return request(publicProInterface.requestURL+'/client/coupons', {
		method: 'GET',
		body: params
	});
}

