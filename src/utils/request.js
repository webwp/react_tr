import fetch from 'dva/fetch';
import axios from 'axios';
import QS from 'query-string';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
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

  let UT = localStorage.getItem('UT') || '';
  //return;
  let typeOfFun='';
  if(options.method==="get" || options.method === 'GET'){
    typeOfFun={method: options.method, url: url, params: options.body,headers: {
      'Authorization': 'Bearer ' + UT.replace(/\"/g,""),
    }};
    return axios.get(url,typeOfFun)
    .then(function(response){
      return response.data;
    })
    .catch(function(err){
      console.log(err);
      const {status, data} = err.response || {};
      return {status, data};
    });
  }else{
    typeOfFun = options.body;
    typeOfFun.method=options.method;
    typeOfFun.url=options.url;
    typeOfFun.headers= {
      'Authorization': 'Bearer ' + UT.replace(/\"/g,"")
    };

    return axios.post(url,typeOfFun)
    .then(function(response){
      console.log(response);
      return response.data;
    })
    .catch(function(err){
      console.log(err);
      const {status, data} = err.response || {};
      return data;
    });
  }
  
  
}