import fetch from 'dva/fetch';
import axios from 'axios';
import QS from 'query-string';
import { Toast } from 'antd-mobile';

import { redirectLogin } from './auth'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response && response.status === 401) {
    redirectLogin();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  let JWT = JSON.parse(localStorage.getItem('UT')) || '';
  if(JWT!=''){
    JWT = JWT.value;
  }
  //return;
  //请求方式为POST时使用data:{}方式传递参数，使用GET方式时用params:{}方式
  let methodData = options.method=='get' || "GET" ? {params:options.body}:{data:options.body};
  //nOptions 存储axios.request(option)发送请求必须的数据option
  let nOptions = {
    headers: {
      'Authorization': 'Bearer ' + JWT,
    },
    timeout: 5000,
    validateStatus: function (status) {
      return (status >= 200 && status < 300)
    },
    url:url,
    ...methodData,
    ...options
  }

  return axios.request(nOptions)
  .then(checkStatus)
  .then(function(response){
    //console.log(response);
    return response.data;
  })
  .catch(function(err){
    //console.log(err.response);
    const {status, data} = err.response || {};
    //收集错误信息 通过Toast进行系统提示
    let errs = '';
    for(var index in data.errors){
       errs +=data.errors[index];
       
    }
    //未登录需登录  
    data.code === 'AUTH_FORBIDDEN' ? redirectLogin() : Toast.fail(data.msg + errs, 3);
    //返回错误数据信息
    return {status, data};
  });
}